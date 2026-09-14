import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity, BarChart3, BrainCircuit, ChevronRight, CircleDollarSign,
  Crosshair, FileSearch, Gauge, LayoutDashboard, Menu, Newspaper,
  Search, ShieldCheck, Sparkles, Target, TrendingDown, TrendingUp,
  Upload, WalletCards, X
} from 'lucide-react';
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';

const chartData = [
  {t:'09:30',p:188},{t:'10:00',p:189.4},{t:'10:30',p:187.8},{t:'11:00',p:191.2},
  {t:'11:30',p:193.1},{t:'12:00',p:192.4},{t:'12:30',p:195.6},{t:'13:00',p:197.2},
  {t:'13:30',p:196.5},{t:'14:00',p:199.4},{t:'14:30',p:201.1},{t:'15:00',p:200.3}
];

const scans = [
  {symbol:'NVDA', name:'NVIDIA', price:'$179.42', move:'+3.8%', side:'Bullish', score:88, setup:'Momentum breakout', risk:'Medium'},
  {symbol:'MU', name:'Micron Technology', price:'$151.84', move:'+2.1%', side:'Bullish', score:81, setup:'Higher-low continuation', risk:'Medium'},
  {symbol:'GLD', name:'SPDR Gold Shares', price:'$351.06', move:'-0.6%', side:'Watch', score:67, setup:'Support retest', risk:'Low'},
  {symbol:'BTC', name:'Bitcoin', price:'$114,820', move:'+1.4%', side:'Bullish', score:74, setup:'Range expansion', risk:'High'}
];

const nav = [
  ['Overview', LayoutDashboard], ['Market Scan', Search], ['Chart Analysis', BarChart3],
  ['Research', Newspaper], ['Risk', ShieldCheck], ['Trade Plan', Target]
];

function Stat({label,value,sub,icon:Icon}){
  return <div className="stat-card"><div className="stat-top"><span>{label}</span><Icon size={18}/></div><strong>{value}</strong><small>{sub}</small></div>
}

function SetupCard({item,onSelect}){
  const bullish=item.side==='Bullish';
  return <button className="setup-card" onClick={()=>onSelect(item)}>
    <div className="setup-head"><div><b>{item.symbol}</b><span>{item.name}</span></div><span className={bullish?'pill green':'pill amber'}>{item.side}</span></div>
    <div className="setup-price"><strong>{item.price}</strong><span className={item.move.startsWith('+')?'up':'down'}>{item.move}</span></div>
    <div className="setup-meta"><span>{item.setup}</span><span>{item.risk} risk</span></div>
    <div className="score"><div><i style={{width:`${item.score}%`}}/></div><b>{item.score}</b></div>
  </button>
}

function FlowStep({n,title,desc,active,icon:Icon,onClick}){
  return <button onClick={onClick} className={`flow-step ${active?'active':''}`}>
    <div className="flow-icon"><Icon size={18}/></div><div><span>0{n}</span><b>{title}</b><small>{desc}</small></div><ChevronRight size={17}/>
  </button>
}

export default function App(){
  const [menuOpen,setMenuOpen]=useState(false);
  const [selected,setSelected]=useState(scans[0]);
  const [stage,setStage]=useState(1);
  const [query,setQuery]=useState('');
  const filtered=useMemo(()=>scans.filter(x=>`${x.symbol} ${x.name} ${x.setup}`.toLowerCase().includes(query.toLowerCase())),[query]);

  return <div className="app-shell">
    <aside className={menuOpen?'sidebar open':'sidebar'}>
      <div className="brand"><div className="brand-mark"><Activity size={19}/></div><div><b>TradeLogic</b><span>Decision workspace</span></div><button className="mobile-close" onClick={()=>setMenuOpen(false)}><X/></button></div>
      <div className="side-label">WORKSPACE</div>
      <nav>{nav.map(([label,Icon],i)=><button key={label} className={i===0?'nav-item current':'nav-item'}><Icon size={18}/><span>{label}</span>{i===1&&<em>4</em>}</button>)}</nav>
      <div className="side-label">PROCESS</div>
      <div className="mini-process">
        <span>SCAN</span><i/><span>ANALYZE</span><i/><span>RESEARCH</span><i/><span>RISK</span><i/><span>PLAN</span>
      </div>
      <div className="side-footer"><div className="status-dot"/><div><b>Workspace ready</b><span>Local reconstructed build</span></div></div>
    </aside>

    <main>
      <header className="topbar"><button className="menu-btn" onClick={()=>setMenuOpen(true)}><Menu/></button><div><h1>Trading Command Center</h1><p>Turn market signals into structured decisions.</p></div><div className="top-actions"><button className="secondary"><Upload size={17}/>Import chart</button><button className="primary"><Sparkles size={17}/>New analysis</button></div></header>

      <section className="content">
        <div className="stats-grid">
          <Stat label="Setups found" value="12" sub="4 high conviction" icon={Crosshair}/>
          <Stat label="Avg. conviction" value="78%" sub="+6% vs last scan" icon={Gauge}/>
          <Stat label="Risk budget" value="1.25%" sub="Per trade limit" icon={ShieldCheck}/>
          <Stat label="Open plans" value="3" sub="2 awaiting trigger" icon={WalletCards}/>
        </div>

        <div className="hero-grid">
          <div className="panel chart-panel">
            <div className="panel-head"><div><span className="eyebrow">ACTIVE ANALYSIS</span><h2>{selected.symbol} · {selected.setup}</h2></div><div className="quote"><strong>{selected.price}</strong><span className={selected.move.startsWith('+')?'up':'down'}>{selected.move}</span></div></div>
            <div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData} margin={{top:10,right:5,left:-25,bottom:0}}><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="currentColor" stopOpacity=".28"/><stop offset="100%" stopColor="currentColor" stopOpacity="0"/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="t" tickLine={false} axisLine={false}/><YAxis domain={['dataMin - 3','dataMax + 3']} tickLine={false} axisLine={false}/><Tooltip/><Area type="monotone" dataKey="p" stroke="currentColor" fill="url(#fill)" strokeWidth={2.5}/></AreaChart></ResponsiveContainer></div>
            <div className="signal-row"><div><TrendingUp size={18}/><span>Trend</span><b>Bullish</b></div><div><BrainCircuit size={18}/><span>Pattern read</span><b>Continuation</b></div><div><Gauge size={18}/><span>Confidence</span><b>82%</b></div><div><ShieldCheck size={18}/><span>Invalidation</span><b>$193.80</b></div></div>
          </div>

          <div className="panel workflow-panel"><div className="panel-head"><div><span className="eyebrow">DECISION ENGINE</span><h2>Build the trade case</h2></div></div>
            <FlowStep n={1} title="Scan" desc="Find qualified setups" icon={Search} active={stage===1} onClick={()=>setStage(1)}/>
            <FlowStep n={2} title="Analyze" desc="Read trend, pattern & momentum" icon={BarChart3} active={stage===2} onClick={()=>setStage(2)}/>
            <FlowStep n={3} title="Research" desc="Check catalysts & fundamentals" icon={FileSearch} active={stage===3} onClick={()=>setStage(3)}/>
            <FlowStep n={4} title="Risk" desc="Size position & define invalidation" icon={ShieldCheck} active={stage===4} onClick={()=>setStage(4)}/>
            <FlowStep n={5} title="Plan" desc="Lock entry, targets & scenarios" icon={Target} active={stage===5} onClick={()=>setStage(5)}/>
          </div>
        </div>

        <div className="panel scanner-panel"><div className="panel-head"><div><span className="eyebrow">MARKET SCAN</span><h2>Top setups</h2></div><label className="searchbox"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search ticker or setup"/></label></div><div className="setup-grid">{filtered.map(item=><SetupCard key={item.symbol} item={item} onSelect={setSelected}/>)}</div></div>

        <div className="bottom-grid">
          <div className="panel thesis"><div className="panel-head"><div><span className="eyebrow">TRADE LOGIC</span><h2>Current thesis</h2></div><span className="pill green">BUY BIAS</span></div><p>Price structure remains constructive above the latest higher low. Momentum is aligned with trend and the setup has room before the next visible resistance zone.</p><div className="thesis-grid"><div><span>Entry area</span><b>$198.20–$200.00</b></div><div><span>Invalidation</span><b>$193.80</b></div><div><span>Target 1</span><b>$206.50</b></div><div><span>Target 2</span><b>$212.00</b></div></div></div>
          <div className="panel risk-card"><div className="panel-head"><div><span className="eyebrow">RISK CHECK</span><h2>Position framing</h2></div><CircleDollarSign size={22}/></div><div className="risk-score"><div><b>7.4</b><span>/10</span></div><p>Favorable reward-to-risk if entry occurs inside the planned zone.</p></div><div className="risk-lines"><span>Max account risk <b>1.25%</b></span><span>Estimated R:R <b>2.4 : 1</b></span><span>Volatility <b>Medium</b></span></div></div>
        </div>
      </section>
    </main>
  </div>
}
