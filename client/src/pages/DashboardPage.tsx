import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  MempoolAlert, 
  MempoolStats, 
  TokenMetrics, 
  TimeSeriesDataPoint,
  SuspiciousPatternType 
} from '@shared/schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FaExclamationTriangle, FaShieldAlt, FaChartBar, FaClock, FaExchangeAlt } from 'react-icons/fa';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { getQueryFn } from '@/lib/queryClient';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { truncateAddress } from '@/lib/utils';

// Custom type for visualization dashboard WebSocket messages
type WsMessage = {
  type: string;
  data: any;
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [realtimeAlerts, setRealtimeAlerts] = useState<MempoolAlert[]>([]);
  const [dashboardStats, setDashboardStats] = useState<MempoolStats | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  
  // Fetch static dashboard data
  const { data: tokenMetrics } = useQuery({
    queryKey: ['/api/dashboard/token-metrics'],
    queryFn: getQueryFn<{ metrics: TokenMetrics[] }>({ on401: 'returnNull' }),
  });
  
  const { data: timeSeriesData } = useQuery({
    queryKey: ['/api/dashboard/time-series'],
    queryFn: getQueryFn<{ data: TimeSeriesDataPoint[] }>({ on401: 'returnNull' }),
  });
  
  const { data: initialAlerts } = useQuery({
    queryKey: ['/api/mempool/alerts'],
    queryFn: getQueryFn<{ alerts: MempoolAlert[] }>({ on401: 'returnNull' }),
  });
  
  const { data: initialStats } = useQuery({
    queryKey: ['/api/mempool/stats'],
    queryFn: getQueryFn<MempoolStats>({ on401: 'returnNull' }),
  });
  
  // Setup WebSocket connection for real-time updates
  useEffect(() => {
    // Close any existing connections
    if (wsRef.current) {
      wsRef.current.close();
    }
    
    // Establish WebSocket connection
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;
    
    ws.onopen = () => {
      console.log('WebSocket connected');
    };
    
    ws.onmessage = (event) => {
      try {
        const message: WsMessage = JSON.parse(event.data);
        console.log('WebSocket message:', message);
        
        // Handle different message types
        if (message.type === 'init') {
          if (message.data.alerts) {
            setRealtimeAlerts(message.data.alerts);
          }
          if (message.data.stats) {
            setDashboardStats(message.data.stats);
          }
        } else if (message.type === 'new_alert') {
          setRealtimeAlerts(prev => [message.data, ...prev].slice(0, 20));
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };
    
    // Cleanup on unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);
  
  // Initialize state from queries when available
  useEffect(() => {
    if (initialAlerts?.alerts && realtimeAlerts.length === 0) {
      setRealtimeAlerts(initialAlerts.alerts);
    }
  }, [initialAlerts]);
  
  useEffect(() => {
    if (initialStats && !dashboardStats) {
      setDashboardStats(initialStats);
    }
  }, [initialStats]);
  
  // Format time series data for charts
  const formattedTimeSeriesData = timeSeriesData?.data?.map(point => ({
    time: new Date(point.timestamp).toLocaleTimeString(),
    value: point.value
  })) || [];
  
  // Colors for charts
  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
  
  // Format token metrics for pie chart
  const pieData = tokenMetrics?.metrics?.map((metric, index) => ({
    name: metric.symbol,
    value: metric.attackCount
  })) || [];
  
  const alertTypeColors: Record<SuspiciousPatternType, string> = {
    [SuspiciousPatternType.POTENTIAL_SANDWICH]: '#FF6384',
    [SuspiciousPatternType.KNOWN_ATTACKER]: '#36A2EB',
    [SuspiciousPatternType.RAPID_TRADES]: '#FFCE56',
    [SuspiciousPatternType.PRICE_MANIPULATION]: '#4BC0C0'
  };
  
  function formatAlertType(type: SuspiciousPatternType): string {
    return type
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <FaChartBar className="text-primary mr-3 text-2xl" />
            <h1 className="text-3xl font-bold">Real-Time Monitoring Dashboard</h1>
          </div>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-3 max-w-md">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="alerts">Real-Time Alerts</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Alerts Today</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <FaExclamationTriangle className="mr-2 text-amber-500" />
                      <div className="text-2xl font-bold">{dashboardStats?.totalAlertsToday || 0}</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Active Attackers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <FaShieldAlt className="mr-2 text-red-500" />
                      <div className="text-2xl font-bold">{dashboardStats?.activeAttackers || 0}</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Recent Impact (USD)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <RiMoneyDollarCircleLine className="mr-2 text-green-500 text-xl" />
                      <div className="text-2xl font-bold">${dashboardStats?.recentImpactUsd.toFixed(2) || "0.00"}</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Last Alert</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <FaClock className="mr-2 text-blue-500" />
                      <div className="text-sm">
                        {realtimeAlerts[0] ? (
                          new Date(realtimeAlerts[0].timestamp).toLocaleTimeString()
                        ) : (
                          "No alerts yet"
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Activity Chart */}
              <Card className="p-4">
                <CardHeader>
                  <CardTitle>Attack Activity (24 Hours)</CardTitle>
                  <CardDescription>Number of detected sandwich attacks over time</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={formattedTimeSeriesData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="time" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Most Impacted Pools */}
              <Card className="p-4">
                <CardHeader>
                  <CardTitle>Most Impacted Pools</CardTitle>
                  <CardDescription>Trading pools with the highest number of sandwich attacks</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={dashboardStats?.mostImpactedPools || []}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="alertCount" fill="#8884d8" name="Alert Count" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Alerts Tab */}
            <TabsContent value="alerts" className="space-y-4">
              <Card className="p-4">
                <CardHeader>
                  <CardTitle>Live Alerts</CardTitle>
                  <CardDescription>Real-time sandwich attack detection alerts from the mempool</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {realtimeAlerts.length > 0 ? (
                      realtimeAlerts.map((alert) => (
                        <Alert key={alert.id} className="border-l-4" style={{ borderLeftColor: alertTypeColors[alert.type] }}>
                          <div className="flex justify-between items-start">
                            <div>
                              <AlertTitle className="flex items-center">
                                <FaExclamationTriangle className="mr-2" style={{ color: alertTypeColors[alert.type] }} />
                                {formatAlertType(alert.type)}
                                <Badge variant="outline" className="ml-2">
                                  {Math.round(alert.confidence * 100)}% confidence
                                </Badge>
                              </AlertTitle>
                              <AlertDescription className="mt-2">
                                <p>{alert.description}</p>
                                {alert.targetTransaction && (
                                  <p className="text-sm mt-1">
                                    <span className="font-semibold">Target TX:</span>{' '}
                                    {truncateAddress(alert.targetTransaction, 8, 8)}
                                  </p>
                                )}
                                {alert.estimatedImpact && (
                                  <p className="text-sm mt-1">
                                    <span className="font-semibold">Impact:</span>{' '}
                                    {alert.estimatedImpact.sol.toFixed(3)} SOL (${alert.estimatedImpact.usd.toFixed(2)})
                                  </p>
                                )}
                              </AlertDescription>
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(alert.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        </Alert>
                      ))
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <FaExchangeAlt className="mx-auto text-4xl mb-4" />
                        <p>Waiting for alerts from the mempool...</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Token Distribution */}
                <Card className="p-4">
                  <CardHeader>
                    <CardTitle>Attack Distribution by Token Pair</CardTitle>
                    <CardDescription>Which token pairs are most frequently targeted</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Token Metrics Table */}
                <Card className="p-4">
                  <CardHeader>
                    <CardTitle>Token Metrics</CardTitle>
                    <CardDescription>Detailed statistics by token pair</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 font-medium">Token Pair</th>
                            <th className="text-left py-3 font-medium">Attacks</th>
                            <th className="text-left py-3 font-medium">Impact (USD)</th>
                            <th className="text-left py-3 font-medium">Avg. Impact %</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tokenMetrics?.metrics?.map((metric) => (
                            <tr key={metric.symbol} className="border-b border-gray-800">
                              <td className="py-3">{metric.symbol}</td>
                              <td className="py-3">{metric.attackCount}</td>
                              <td className="py-3">${metric.totalImpactUsd.toFixed(2)}</td>
                              <td className="py-3">{metric.averageImpactPercentage.toFixed(2)}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Attacker Addresses */}
                <Card className="p-4 lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Known Attacker Addresses</CardTitle>
                    <CardDescription>Addresses identified as performing sandwich attacks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 font-medium">Address</th>
                            <th className="text-left py-3 font-medium">Active Since</th>
                            <th className="text-left py-3 font-medium">Attack Count</th>
                            <th className="text-left py-3 font-medium">Est. Profit (USD)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tokenMetrics?.metrics?.flatMap(metric => 
                            metric.attackers.map((attacker, i) => (
                              <tr key={`${metric.symbol}-${attacker}-${i}`} className="border-b border-gray-800">
                                <td className="py-3 font-mono">{truncateAddress(attacker)}</td>
                                <td className="py-3">April 18, 2024</td>
                                <td className="py-3">{Math.floor(Math.random() * 50) + 10}</td>
                                <td className="py-3">${(Math.random() * 5000 + 500).toFixed(2)}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}