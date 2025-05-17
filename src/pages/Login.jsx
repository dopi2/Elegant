import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail, FiAlertCircle } from 'react-icons/fi';
import ReCAPTCHA from 'react-google-recaptcha';
import { Helmet } from 'react-helmet';
import { Turnstile } from '@marsidev/react-turnstile';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [cloudflareToken, setCloudflareToken] = useState(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTime, setLockTime] = useState(0);
  const navigate = useNavigate();

  // Cloudflare Turnstile site key
  const CLOUDFLARE_SITE_KEY = 'your-cloudflare-site-key';
  const RECAPTCHA_SITE_KEY = 'your-recaptcha-site-key';

  useEffect(() => {
    // Check for locked account status
    const storedLockTime = localStorage.getItem('accountLockTime');
    if (storedLockTime && Date.now() < parseInt(storedLockTime)) {
      setIsLocked(true);
      setLockTime(parseInt(storedLockTime) - Date.now());
    }
  }, []);

  useEffect(() => {
    let timer;
    if (isLocked && lockTime > 0) {
      timer = setInterval(() => {
        setLockTime(prev => prev - 1000);
        if (lockTime <= 1000) {
          setIsLocked(false);
          localStorage.removeItem('accountLockTime');
          localStorage.removeItem('loginAttempts');
          setLoginAttempts(0);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLocked, lockTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (isLocked) {
      setError(`Account temporarily locked. Please try again in ${Math.ceil(lockTime / 1000)} seconds.`);
      setLoading(false);
      return;
    }

    if (!cloudflareToken && !captchaToken) {
      setError('Please complete the security verification');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call with Cloudflare protection headers
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CF-Captcha-Token': cloudflareToken || '',
          'X-Captcha-Token': captchaToken || '',
          'X-Forwarded-For': window.clientIP || '' // Would be set by Cloudflare proxy
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        const attempts = loginAttempts + 1;
        setLoginAttempts(attempts);
        
        if (attempts >= 3) {
          const lockDuration = 5 * 60 * 1000; // 5 minutes
          setIsLocked(true);
          setLockTime(lockDuration);
          localStorage.setItem('accountLockTime', Date.now() + lockDuration);
          localStorage.setItem('loginAttempts', attempts);
          throw new Error('Too many failed attempts. Account temporarily locked.');
        }
        
        throw new Error(data.message || 'Login failed');
      }

      // Reset attempts on success
      setLoginAttempts(0);
      localStorage.removeItem('loginAttempts');
      localStorage.removeItem('accountLockTime');

      // Store token and redirect
      localStorage.setItem('authToken', data.token);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (ms) => {
    const seconds = Math.ceil(ms / 1000);
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen flex items-center justify-center p-4">
      <Helmet>
        <title>Login | Secure Access</title>
        <meta name="description" content="Secure login to your account with multi-factor verification" />
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
      </Helmet>
      
      <div className="container mx-auto px-4 py-12 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 border border-gray-800 shadow-2xl"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 p-3 rounded-full">
              <FiLock className="text-2xl text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Secure Login
          </h1>
          <p className="text-center text-white/60 mb-6">Access your account with enhanced security</p>
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 flex items-start gap-2"
            >
              <FiAlertCircle className="mt-0.5 flex-shrink-0" />
              <div>{error}</div>
            </motion.div>
          )}
          
          {isLocked && (
            <div className="bg-yellow-500/20 border border-yellow-500/50 text-yellow-500 p-3 rounded-lg mb-6 text-center">
              Account locked for security. Please try again in {formatTime(lockTime)}.
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-1">
                <FiMail className="text-white/60" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLocked}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all"
                  placeholder="your@email.com"
                />
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-1">
                <FiLock className="text-white/60" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLocked}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all"
                  placeholder="••••••••"
                />
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <div className="mt-2 text-right">
                <Link to="/forgot-password" className="text-sm text-white/60 hover:text-white/90 hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>
            
            {/* Cloudflare Turnstile */}
            <div className="flex justify-center">
              <Turnstile 
                siteKey={CLOUDFLARE_SITE_KEY}
                onSuccess={(token) => setCloudflareToken(token)}
                options={{
                  theme: 'dark',
                  size: 'compact'
                }}
              />
            </div>
            
            {/* Google reCAPTCHA fallback */}
            {!cloudflareToken && (
              <div className="flex justify-center">
                <ReCAPTCHA
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={(token) => setCaptchaToken(token)}
                  theme="dark"
                />
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading || isLocked}
              className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg transition-all ${loading || isLocked ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                <>
                  {isLocked ? 'Account Locked' : 'Secure Login'}
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-sm text-white/60">
              Don't have an account?{' '}
              <Link to="/signup" className="text-white hover:underline font-medium">
                Sign up
              </Link>
            </p>
            
            <div className="mt-4 flex justify-center gap-4">
              <button className="text-white/60 hover:text-white/90 transition-colors">
                <span className="sr-only">Login with Google</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                </svg>
              </button>
              <button className="text-white/60 hover:text-white/90 transition-colors">
                <span className="sr-only">Login with GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
        
        <div className="mt-6 text-center text-xs text-white/40">
          Protected by Cloudflare and reCAPTCHA. By logging in, you agree to our Terms and Privacy Policy.
        </div>
      </div>
    </div>
  );
};

export default Login;