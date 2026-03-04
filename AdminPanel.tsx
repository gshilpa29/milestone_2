
import React, { useEffect, useState } from 'react';
import { Users, ShieldCheck, Activity, Settings, MoreVertical, ShoppingBag, Plus, Trash2, Package, Gift, Ticket, Coins, Zap } from 'lucide-react';
import { getProducts, addProduct } from '../services/productService';
import { getRewards, addReward, deleteReward } from '../services/rewardService';
import { Product, EmissionLevel, Reward } from '../types';

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'products' | 'rewards'>('users');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isAddingReward, setIsAddingReward] = useState(false);
  
  // New Product Form State
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: 'Cosmetics',
    image: 'https://picsum.photos/seed/new/400/300',
    brand: '',
    carbonScore: 80,
    emissionLevel: EmissionLevel.MEDIUM,
    carbonData: { production: 1, transport: 1, packaging: 1, usage: 1, total: 4 },
    materials: [],
    manufactureDate: new Date().toISOString().split('T')[0],
    expectedLifespan: '2 years',
    repairabilityScore: 5,
    recyclingInstructions: 'Recycle according to local guidelines.',
    lifecycleStages: [
      { stage: 'Production', description: 'Standard manufacturing process.', location: 'Global', icon: 'Factory' }
    ],
    purchaseCount: 0,
    salesTrend: [{ month: 'Jan', sales: 0 }],
    pointsValue: 50
  });
  const [materialInput, setMaterialInput] = useState('');

  // New Reward Form State
  const [newReward, setNewReward] = useState<Omit<Reward, 'id'>>({
    title: '',
    description: '',
    pointsCost: 500,
    discountCode: '',
    type: 'percentage',
    value: 10
  });

  useEffect(() => {
    const registered = JSON.parse(localStorage.getItem('ecobazaar_registered_users') || '[]');
    setUsers(registered);
    
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    
    const fetchRewards = async () => {
      const data = await getRewards();
      setRewards(data);
    };

    fetchProducts();
    fetchRewards();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const added = await addProduct(newProduct);
    setProducts([...products, added]);
    setIsAddingProduct(false);
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      category: 'Electronics',
      image: 'https://picsum.photos/seed/new/400/300',
      brand: '',
      carbonScore: 80,
      emissionLevel: EmissionLevel.MEDIUM,
      carbonData: { production: 1, transport: 1, packaging: 1, usage: 1, total: 4 },
      materials: [],
      manufactureDate: new Date().toISOString().split('T')[0],
      expectedLifespan: '2 years',
      repairabilityScore: 5,
      recyclingInstructions: 'Recycle according to local guidelines.',
      lifecycleStages: [
        { stage: 'Production', description: 'Standard manufacturing process.', location: 'Global', icon: 'Factory' }
      ],
      purchaseCount: 0,
      salesTrend: [{ month: 'Jan', sales: 0 }],
      pointsValue: 50
    });
  };

  const handleAddReward = async (e: React.FormEvent) => {
    e.preventDefault();
    const added = await addReward(newReward);
    setRewards([...rewards, added]);
    setIsAddingReward(false);
    setNewReward({
      title: '',
      description: '',
      pointsCost: 500,
      discountCode: '',
      type: 'percentage',
      value: 10
    });
  };

  const handleDeleteReward = async (id: string) => {
    if (confirm('Are you sure you want to delete this reward?')) {
      await deleteReward(id);
      setRewards(rewards.filter(r => r.id !== id));
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const products = JSON.parse(localStorage.getItem('ecobazaar_products') || '[]');
      const updated = products.filter((p: any) => p.id !== id);
      localStorage.setItem('ecobazaar_products', JSON.stringify(updated));
      setProducts(updated);
    }
  };

  const addMaterial = () => {
    if (materialInput.trim()) {
      setNewProduct({
        ...newProduct,
        materials: [...newProduct.materials, materialInput.trim()]
      });
      setMaterialInput('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-emerald-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Control Center</h1>
            <p className="text-gray-600">Full system access and database management.</p>
          </div>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'users' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Users
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'products' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Products
          </button>
          <button 
            onClick={() => setActiveTab('rewards')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'rewards' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Rewards
          </button>
        </div>
      </div>

      {activeTab === 'users' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className="text-xs text-green-500 font-bold">+12%</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{users.length}</div>
                <div className="text-xs text-gray-500 font-medium">Total Users</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <span className="text-xs text-emerald-500 font-bold">Secure</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">Auth</div>
                <div className="text-xs text-gray-500 font-medium">JWT Status</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                    <Activity className="w-5 h-5 text-orange-500" />
                    <span className="text-xs text-orange-500 font-bold">Peak</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">99.9%</div>
                <div className="text-xs text-gray-500 font-medium">System Uptime</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                    <Settings className="w-5 h-5 text-purple-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">Active</div>
                <div className="text-xs text-gray-500 font-medium">RBAC Engine</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">Registered Users</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Created At</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                                {u.name.charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-gray-900">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase ${
                          u.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 
                          u.role === 'Analyst' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.length === 0 && (
                  <div className="p-8 text-center text-gray-500 text-sm">No users registered yet.</div>
              )}
            </div>
          </div>
        </>
      ) : activeTab === 'products' ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              Product Database
            </h3>
            <button 
              onClick={() => {
                if(confirm('Are you sure you want to reset the database to initial products? All custom products will be lost.')) {
                  localStorage.removeItem('ecobazaar_products');
                  window.location.reload();
                }
              }}
              className="flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
            >
              <Trash2 className="w-4 h-4" /> Reset DB
            </button>
            <button 
              onClick={() => setIsAddingProduct(true)}
              className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>

          {isAddingProduct && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-white max-h-[90vh] overflow-y-auto">
                <div className="p-8 border-b bg-slate-50 flex items-center justify-between sticky top-0 z-10">
                  <h3 className="text-xl font-black text-slate-900">Add New Item to Database</h3>
                  <button onClick={() => setIsAddingProduct(false)} className="p-2 hover:bg-white rounded-xl transition-colors">
                    <Plus className="w-6 h-6 text-slate-500 rotate-45" />
                  </button>
                </div>
                <form onSubmit={handleAddProduct} className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1">Product Name</label>
                      <input 
                        type="text" required value={newProduct.name} 
                        onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1">Brand</label>
                      <input 
                        type="text" required value={newProduct.brand} 
                        onChange={e => setNewProduct({...newProduct, brand: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1">Price ($)</label>
                      <input 
                        type="number" step="0.01" required value={newProduct.price} 
                        onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1">Category</label>
                      <select 
                        value={newProduct.category} 
                        onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all"
                      >
                        <option>Electronics</option>
                        <option>Apparel</option>
                        <option>Home & Kitchen</option>
                        <option>Cosmetics</option>
                        <option>Accessories</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1">Eco Score (0-100)</label>
                      <input 
                        type="number" required value={newProduct.carbonScore} 
                        onChange={e => setNewProduct({...newProduct, carbonScore: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1">Emission Level</label>
                      <select 
                        value={newProduct.emissionLevel} 
                        onChange={e => setNewProduct({...newProduct, emissionLevel: e.target.value as EmissionLevel})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all"
                      >
                        <option value={EmissionLevel.LOW}>Low Emission</option>
                        <option value={EmissionLevel.MEDIUM}>Medium Emission</option>
                        <option value={EmissionLevel.HIGH}>High Emission</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1">Points Value</label>
                      <input 
                        type="number" required value={newProduct.pointsValue} 
                        onChange={e => setNewProduct({...newProduct, pointsValue: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1">Description</label>
                    <textarea 
                      required value={newProduct.description} 
                      onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all h-24"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1">Materials (Add one by one)</label>
                    <div className="flex gap-2 mb-3">
                      <input 
                        type="text" value={materialInput} 
                        onChange={e => setMaterialInput(e.target.value)}
                        placeholder="e.g. Recycled Cotton"
                        className="flex-grow px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-emerald-500 transition-all"
                      />
                      <button type="button" onClick={addMaterial} className="bg-slate-100 p-3 rounded-xl hover:bg-slate-200 transition-colors">
                        <Plus className="w-5 h-5 text-slate-600" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {newProduct.materials.map((m, i) => (
                        <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100 flex items-center gap-2">
                          {m}
                          <button type="button" onClick={() => setNewProduct({...newProduct, materials: newProduct.materials.filter((_, idx) => idx !== i)})}>
                            <Plus className="w-3 h-3 rotate-45" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <button type="submit" className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl text-sm hover:bg-emerald-700 shadow-xl shadow-emerald-500/20 transition-all uppercase tracking-widest">
                    Save to Database
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm flex gap-4 items-center">
                <img src={product.image} alt={product.name} className="w-20 h-20 rounded-2xl object-cover" />
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 truncate">{product.name}</h4>
                    <Zap className="w-3 h-3 text-emerald-500" />
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{product.category} • ${product.price}</p>
                  <div className="flex gap-1 mt-2">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded uppercase">{product.carbonScore} Score</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDeleteProduct(product.id)}
                  className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Gift className="w-5 h-5 text-blue-600" />
              Rewards Catalog
            </h3>
            <button 
              onClick={() => setIsAddingReward(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
            >
              <Plus className="w-4 h-4" /> Add Reward
            </button>
          </div>

          {isAddingReward && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-white max-h-[90vh] overflow-y-auto">
                <div className="p-8 border-b bg-slate-50 flex items-center justify-between sticky top-0 z-10">
                  <h3 className="text-xl font-black text-slate-900">Create New Reward</h3>
                  <button onClick={() => setIsAddingReward(false)} className="p-2 hover:bg-white rounded-xl transition-colors">
                    <Plus className="w-6 h-6 text-slate-500 rotate-45" />
                  </button>
                </div>
                <form onSubmit={handleAddReward} className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1">Reward Title</label>
                      <input 
                        type="text" required value={newReward.title} 
                        onChange={e => setNewReward({...newReward, title: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-blue-500 transition-all"
                        placeholder="e.g. 15% Off Coupon"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1">Points Cost</label>
                      <input 
                        type="number" required value={newReward.pointsCost} 
                        onChange={e => setNewReward({...newReward, pointsCost: parseInt(e.target.value)})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1">Discount Code</label>
                      <input 
                        type="text" required value={newReward.discountCode} 
                        onChange={e => setNewReward({...newReward, discountCode: e.target.value.toUpperCase()})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-blue-500 transition-all"
                        placeholder="e.g. SAVE15"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1">Reward Type</label>
                      <select 
                        value={newReward.type} 
                        onChange={e => setNewReward({...newReward, type: e.target.value as 'percentage' | 'fixed'})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-blue-500 transition-all"
                      >
                        <option value="percentage">Percentage Discount</option>
                        <option value="fixed">Fixed Amount Discount</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1">Discount Value</label>
                      <input 
                        type="number" required value={newReward.value} 
                        onChange={e => setNewReward({...newReward, value: parseFloat(e.target.value)})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1">Description</label>
                    <textarea 
                      required value={newReward.description} 
                      onChange={e => setNewReward({...newReward, description: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-blue-500 transition-all h-24"
                      placeholder="Describe what the user gets..."
                    />
                  </div>
                  <button type="submit" className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl text-sm hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all uppercase tracking-widest">
                    Create Reward
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map(reward => (
              <div key={reward.id} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm relative group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-50 rounded-2xl">
                    <Ticket className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{reward.title}</h4>
                    <div className="flex items-center gap-1 text-amber-600 font-bold text-xs">
                      <Coins className="w-3 h-3" />
                      {reward.pointsCost} Points
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-medium mb-4 line-clamp-2">{reward.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Code: {reward.discountCode}</span>
                  <button 
                    onClick={() => handleDeleteReward(reward.id)}
                    className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            {rewards.length === 0 && (
              <div className="col-span-full py-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <Gift className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-bold">No rewards in catalog yet.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel;
