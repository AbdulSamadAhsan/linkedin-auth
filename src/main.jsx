import React, {useState, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route, Navigate, Link, useNavigate} from 'react-router-dom';
import './styles.css';
import {api} from './api';
function Logo(){return <Link to="/login" className="logo" aria-label="LinkedIn home">Linked<span>in</span></Link>}
function Icon({name,color}){
 if(name==='Google')return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.36Z"/><path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.41l-3.24-2.51c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.59A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.41 13.92a6 6 0 0 1 0-3.84V7.49H3.07a10 10 0 0 0 0 9.02l3.34-2.59Z"/><path fill="#EA4335" d="M12 5.96c1.47 0 2.79.51 3.82 1.51l2.87-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.93 5.49l3.34 2.59A5.99 5.99 0 0 1 12 5.96Z"/></svg>;
 if(name==='Microsoft')return <svg viewBox="0 0 24 24" aria-hidden="true">{[[0,0,'#f35325'],[13,0,'#81bc06'],[0,13,'#05a6f0'],[13,13,'#ffba08']].map(([x,y,c])=><rect key={`${x}-${y}`} x={x} y={y} width="11" height="11" fill={color?c:'currentColor'}/>)}</svg>;
 return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.05 12.54c.03 3.22 2.83 4.29 2.86 4.3-.02.08-.45 1.54-1.48 3.05-.9 1.31-1.83 2.61-3.3 2.64-1.45.04-1.92-.85-3.58-.85-1.65 0-2.17.82-3.55.88-1.42.05-2.5-1.42-3.4-2.72-1.84-2.66-3.24-7.51-1.35-10.79a5.27 5.27 0 0 1 4.47-2.71c1.4-.03 2.72.94 3.57.94.86 0 2.46-1.16 4.15-.99.71.03 2.69.29 3.96 2.16-.1.06-2.37 1.38-2.35 4.09ZM14.33 4.5c.75-.91 1.25-2.17 1.12-3.43-1.08.04-2.39.72-3.16 1.63-.69.8-1.29 2.08-1.13 3.31 1.2.09 2.42-.61 3.17-1.51Z"/></svg>;
}
function Policies({join}){return <p className="policies">{join?'By clicking Agree & Join or Continue, you agree to the LinkedIn ':'By continuing, you agree to LinkedIn’s '}<a href="https://www.linkedin.com/legal/user-agreement" target="_blank" rel="noreferrer">User Agreement</a>, <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a>, and <a href="https://www.linkedin.com/legal/cookie-policy" target="_blank" rel="noreferrer">Cookie Policy</a>.</p>}
function Divider(){return <div className="divider"><span>or</span></div>}
function Social({join,onSelect}){return <div className="social-buttons">{(join?['Google','Microsoft']:['Google','Microsoft','Apple']).map(name=><button key={name} type="button" className="social" onClick={()=>onSelect(name)}><Icon name={name} color={join}/>{join||name==='Google'?'Continue':'Sign in'} with {name}</button>)}</div>}
function AuthPage({join=false}){
 const [visible,setVisible]=useState(false),[notice,setNotice]=useState(''),[busy,setBusy]=useState(false);
 const navigate=useNavigate();
 useEffect(()=>{document.title=join?'LinkedIn | Join now':'LinkedIn | Sign in'},[join]);
 const submit=async e=>{
   e.preventDefault(); if(busy)return;
   const form=new FormData(e.currentTarget);
   setBusy(true);setNotice('');
   try {
     await api(join?'/auth/register':'/auth/login',{method:'POST',body:JSON.stringify({email:form.get('email'),password:form.get('password'),remember:form.get('remember')==='on'})});
     navigate('/account',{replace:true});
   } catch(error){setNotice(error.message)} finally{setBusy(false)}
 };
 const social=name=>setNotice(`${name} sign-in is not configured yet. Use your email and password to sign in.`);
 return <div className={`page ${join?'join-page':'login-page'}`}><header><Logo/></header><main>{join&&<h1 className="join-title">Join LinkedIn now — it’s free!</h1>}<section className="auth-card" aria-label={join?'Join LinkedIn':'Sign in'}>{!join&&<><h1>Sign in</h1><p className="new-member">New to LinkedIn? <Link to="/join">Join now</Link></p><Social onSelect={social}/><Policies/><Divider/></>}<form onSubmit={submit}><div className="field"><label htmlFor="email">{join?'Email':'Email or phone'}</label><input id="email" name="email" type={join?'email':'text'} autoComplete="username" required/></div><div className="field"><label htmlFor="password">Password</label><div className="password-field"><input id="password" name="password" type={visible?'text':'password'} autoComplete={join?'new-password':'current-password'} minLength={join?8:undefined} maxLength={128} required/><button type="button" className="password-toggle" aria-label={visible?'Hide password':'Show password'} aria-pressed={visible} onClick={()=>setVisible(!visible)}>{join?(visible?'Hide':'Show'):<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>{visible&&<path d="m3 3 18 18"/>}</svg>}</button></div></div>{!join&&<button type="button" className="forgot text-button" onClick={()=>setNotice('Password recovery is not configured yet. Email delivery must be connected to enable password reset.')}>Forgot password?</button>}<label className="remember"><input type="checkbox" name="remember" defaultChecked/><span>{join?'Remember me':'Keep me signed in'}</span></label>{join&&<Policies join/>}<button className="primary" type="submit" disabled={busy}>{busy?'Please wait…':join?'Agree & Join':'Sign in'}</button></form>{join&&<><Divider/><Social join onSelect={social}/><p className="existing-member">Already on LinkedIn? <Link to="/login">Sign in</Link></p></>}{notice&&<div className="notice" role="status">{notice}<button type="button" aria-label="Dismiss message" onClick={()=>setNotice('')}>×</button></div>}</section></main></div>
}

function AccountPage(){
 const [user,setUser]=useState(null),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 const navigate=useNavigate();
 useEffect(()=>{
   document.title='Your account';
   let active=true;
   api('/auth/me').then(data=>{if(active)setUser(data.user)}).catch(error=>{
     if(!active)return;
     if(error.status===401)navigate('/login',{replace:true});else setError(error.message);
   });
   return ()=>{active=false};
 },[navigate]);
 async function logout(){
   setBusy(true);setError('');
   try{await api('/auth/logout',{method:'POST',body:'{}'});navigate('/login',{replace:true})}
   catch(error){setError(error.message)}finally{setBusy(false)}
 }
 return <div className="page login-page"><header><Logo/></header><main><section className="auth-card account-card"><h1>{user?'You’re signed in':'Your account'}</h1>{user?<><p>Welcome! Your account is ready.</p><p className="account-email">{user.email}</p><button className="primary" disabled={busy} onClick={logout}>{busy?'Signing out…':'Sign out'}</button></>:!error&&<p role="status">Loading your account…</p>}{error&&<p className="notice" role="alert">{error}</p>}</section></main></div>
}

function App(){return <BrowserRouter><Routes><Route path="/account" element={<AccountPage/>}/><Route path="/login" element={<AuthPage key="login"/>}/><Route path="/join" element={<AuthPage key="join" join/>}/><Route path="*" element={<Navigate to="/login" replace/>}/></Routes></BrowserRouter>}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
