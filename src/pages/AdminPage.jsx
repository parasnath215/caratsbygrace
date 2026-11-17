// src/pages/AdminPage.jsx
// Carats by Grace — Website CMS & Catalog Admin Portal

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Save,
  Trash2,
  Edit2,
  Download,
  RotateCcw,
  Check,
  X,
  Sparkles,
} from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import {
  INITIAL_PRODUCTS,
  getStoredProducts,
  saveProducts,
  getStoredSettings,
  saveSettings,
  CATEGORIES,
  COLLECTIONS,
} from '../data/products';
import styles from './AdminPage.module.css';

export default function AdminPage() {
  useDocumentTitle('Atelier CMS & Catalogue Management · Admin');

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'settings' | 'export'
  const [productsList, setProductsList] = useState([]);
  const [settings, setSettings] = useState(getStoredSettings());
  const [isEditing, setIsEditing] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setProductsList(getStoredProducts());
    setSettings(getStoredSettings());
  }, []);

  const triggerFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(''), 3000);
  };

  const toggleStatus = (id) => {
    const updated = productsList.map((p) => {
      if (p.id === id) {
        const nextStatus = p.status === 'sold' ? 'available' : 'sold';
        return { ...p, status: nextStatus };
      }
      return p;
    });
    setProductsList(updated);
    saveProducts(updated);
    triggerFeedback('Status updated successfully');
  };

  const toggleOneOfOne = (id) => {
    const updated = productsList.map((p) => {
      if (p.id === id) {
        return { ...p, isOneOfOne: !p.isOneOfOne };
      }
      return p;
    });
    setProductsList(updated);
    saveProducts(updated);
    triggerFeedback('Exclusivity updated');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this design?')) {
      const updated = productsList.filter((p) => p.id !== id);
      setProductsList(updated);
      saveProducts(updated);
      triggerFeedback('Design removed');
    }
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    let updated;
    if (currentEdit.id) {
      updated = productsList.map((p) => (p.id === currentEdit.id ? currentEdit : p));
    } else {
      const newProduct = {
        ...currentEdit,
        id: `cg-${Date.now()}`,
        slug: currentEdit.slug || currentEdit.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      };
      updated = [newProduct, ...productsList];
    }
    setProductsList(updated);
    saveProducts(updated);
    setIsEditing(false);
    setCurrentEdit(null);
    triggerFeedback('Design saved to catalogue');
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    saveSettings(settings);
    triggerFeedback('Brand settings updated');
  };

  const handleResetCatalogue = () => {
    if (window.confirm('Reset all catalogue items to original factory defaults?')) {
      setProductsList(INITIAL_PRODUCTS);
      saveProducts(INITIAL_PRODUCTS);
      triggerFeedback('Catalogue restored to defaults');
    }
  };

  const downloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(productsList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `carats-by-grace-catalog-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Top bar */}
        <header className={styles.topBar}>
          <div>
            <h1 className={styles.heading}>Carats by Grace Atelier CMS</h1>
            <div className={styles.subHeading}>
              Manage Jewellery Catalogue, One-of-One Exclusives & Atelier Details
            </div>
          </div>

          <div className={styles.topActions}>
            <button
              className={styles.btnPrimary}
              onClick={() => {
                setCurrentEdit({
                  name: '',
                  slug: '',
                  category: 'rings',
                  collection: 'the-empress',
                  isOneOfOne: false,
                  status: 'available',
                  specs: '',
                  metal: '18K Yellow Gold',
                  diamondShape: 'Round Brilliant',
                  caratWeight: '1.50 ct',
                  clarity: 'VVS1',
                  colour: 'D',
                  cut: 'Ideal',
                  certification: 'IGI Certified',
                  description: '',
                  images: ['/assets/categories/cat_rings.webp'],
                });
                setIsEditing(true);
              }}
            >
              <Plus size={16} /> Add New Design
            </button>

            <button className={styles.btnOutline} onClick={downloadJson}>
              <Download size={16} /> Export JSON
            </button>

            <button className={styles.btnOutline} onClick={handleResetCatalogue}>
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </header>

        {feedback && (
          <div style={{ padding: '12px 16px', background: '#EAF7EE', color: '#1A5928', marginBottom: 20, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Check size={18} /> {feedback}
          </div>
        )}

        {/* Tab navigation */}
        <nav className={styles.tabNav}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'products' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Jewellery Designs ({productsList.length})
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'settings' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Showroom & Contact Details
          </button>
        </nav>

        {/* Tab 1: Products */}
        {activeTab === 'products' && (
          <div className={styles.card}>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Design Name & Specs</th>
                    <th>Category</th>
                    <th>Collection</th>
                    <th>Exclusivity</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productsList.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <img
                          src={p.images?.[0] || '/assets/categories/cat_rings.webp'}
                          alt={p.name}
                          className={styles.thumb}
                        />
                      </td>
                      <td>
                        <strong>{p.name}</strong>
                        <div style={{ fontSize: '0.78rem', color: 'var(--muted, #7A6F70)', marginTop: 4 }}>
                          {p.specs || `${p.metal} · ${p.caratWeight}`}
                        </div>
                      </td>
                      <td>{p.category}</td>
                      <td>{p.collection}</td>
                      <td>
                        <button
                          className={styles.btnAction}
                          onClick={() => toggleOneOfOne(p.id)}
                          style={{
                            background: p.isOneOfOne ? 'var(--burgundy, #5D0A24)' : '#FAF6F1',
                            color: p.isOneOfOne ? '#FFF' : '#333',
                            fontWeight: 600,
                          }}
                        >
                          {p.isOneOfOne ? 'ONE OF ONE ✦' : 'Standard'}
                        </button>
                      </td>
                      <td>
                        <button
                          className={`${styles.toggleBtn} ${p.status === 'sold' ? styles.toggleSold : styles.toggleAvailable}`}
                          onClick={() => toggleStatus(p.id)}
                        >
                          {p.status === 'sold' ? 'Sold / Archived' : 'Available'}
                        </button>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button
                            className={styles.btnAction}
                            onClick={() => {
                              setCurrentEdit(p);
                              setIsEditing(true);
                            }}
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            className={styles.btnAction}
                            onClick={() => handleDelete(p.id)}
                            title="Delete"
                            style={{ color: '#A00' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Showroom & Contact */}
        {activeTab === 'settings' && (
          <div className={styles.card}>
            <form onSubmit={handleSaveSettings} style={{ maxWidth: 640 }}>
              <div style={{ marginBottom: 18 }}>
                <label className={styles.formLabel}>Showroom Address</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={settings.location}
                  onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: 18 }}>
                <label className={styles.formLabel}>WhatsApp Business Number (digits with country code)</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: 18 }}>
                <label className={styles.formLabel}>Telephone / Mobile Call Line</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: 18 }}>
                <label className={styles.formLabel}>Google Maps Link</label>
                <input
                  type="url"
                  className={styles.formInput}
                  value={settings.mapsUrl}
                  onChange={(e) => setSettings({ ...settings, mapsUrl: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: 18 }}>
                <label className={styles.formLabel}>Instagram Link</label>
                <input
                  type="url"
                  className={styles.formInput}
                  value={settings.instagram}
                  onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label className={styles.formLabel}>Showroom Visiting Hours</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={settings.hours}
                  onChange={(e) => setSettings({ ...settings, hours: e.target.value })}
                />
              </div>

              <button type="submit" className={styles.btnPrimary}>
                <Save size={16} /> Save Changes
              </button>
            </form>
          </div>
        )}

        {/* Edit Modal */}
        {isEditing && currentEdit && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: '1.6rem' }}>
                  {currentEdit.id ? 'Edit Jewellery Design' : 'Add New Design'}
                </h2>
                <button
                  onClick={() => setIsEditing(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveProduct}>
                <div className={styles.modalGrid}>
                  <div className={styles.fullCol}>
                    <label className={styles.formLabel}>Design Title *</label>
                    <input
                      type="text"
                      required
                      className={styles.formInput}
                      value={currentEdit.name}
                      onChange={(e) => setCurrentEdit({ ...currentEdit, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className={styles.formLabel}>Category</label>
                    <select
                      className={styles.formSelect}
                      value={currentEdit.category}
                      onChange={(e) => setCurrentEdit({ ...currentEdit, category: e.target.value })}
                    >
                      <option value="rings">Rings</option>
                      <option value="engagement-rings">Engagement Rings</option>
                      <option value="earrings">Earrings</option>
                      <option value="necklaces">Necklaces</option>
                      <option value="pendants">Pendants</option>
                      <option value="bracelets">Bracelets</option>
                    </select>
                  </div>

                  <div>
                    <label className={styles.formLabel}>Collection</label>
                    <select
                      className={styles.formSelect}
                      value={currentEdit.collection}
                      onChange={(e) => setCurrentEdit({ ...currentEdit, collection: e.target.value })}
                    >
                      <option value="the-empress">The Empress</option>
                      <option value="the-nocturne-edit">The Nocturne Edit</option>
                      <option value="solitaire-essentials">Solitaire Essentials</option>
                      <option value="exclusive-designs">Exclusive Designs</option>
                    </select>
                  </div>

                  <div>
                    <label className={styles.formLabel}>Diamond Shape</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="e.g. Oval Brilliant / Pear Cut"
                      value={currentEdit.diamondShape || ''}
                      onChange={(e) => setCurrentEdit({ ...currentEdit, diamondShape: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className={styles.formLabel}>Carat Weight</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="e.g. 2.50 ct"
                      value={currentEdit.caratWeight || ''}
                      onChange={(e) => setCurrentEdit({ ...currentEdit, caratWeight: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className={styles.formLabel}>Clarity & Colour</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="e.g. VVS1 Clarity · D Colour"
                      value={currentEdit.clarity || ''}
                      onChange={(e) => setCurrentEdit({ ...currentEdit, clarity: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className={styles.formLabel}>Metal & Purity</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="e.g. 18K Yellow Gold / 950 Platinum"
                      value={currentEdit.metal || ''}
                      onChange={(e) => setCurrentEdit({ ...currentEdit, metal: e.target.value })}
                    />
                  </div>

                  <div className={styles.fullCol}>
                    <label className={styles.formLabel}>Full Specifications Line</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="e.g. 18K White Gold · 3.50 ct TW · VVS2 Clarity · IGI Certified"
                      value={currentEdit.specs || ''}
                      onChange={(e) => setCurrentEdit({ ...currentEdit, specs: e.target.value })}
                    />
                  </div>

                  <div className={styles.fullCol}>
                    <label className={styles.formLabel}>Primary Image Path / URL</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="/assets/model1/m1_8252_final.webp"
                      value={currentEdit.images?.[0] || ''}
                      onChange={(e) =>
                        setCurrentEdit({
                          ...currentEdit,
                          images: [e.target.value, ...(currentEdit.images?.slice(1) || [])],
                        })
                      }
                    />
                  </div>

                  <div className={styles.fullCol}>
                    <label className={styles.formLabel}>Editorial Description</label>
                    <textarea
                      rows={3}
                      className={styles.formTextarea}
                      value={currentEdit.description || ''}
                      onChange={(e) => setCurrentEdit({ ...currentEdit, description: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem' }}>
                      <input
                        type="checkbox"
                        checked={Boolean(currentEdit.isOneOfOne)}
                        onChange={(e) => setCurrentEdit({ ...currentEdit, isOneOfOne: e.target.checked })}
                      />
                      Mark as "ONE OF ONE" Exclusive Design
                    </label>
                  </div>

                  <div>
                    <label className={styles.formLabel}>Availability</label>
                    <select
                      className={styles.formSelect}
                      value={currentEdit.status || 'available'}
                      onChange={(e) => setCurrentEdit({ ...currentEdit, status: e.target.value })}
                    >
                      <option value="available">Available for Acquisition</option>
                      <option value="sold">Sold / Retired to Archive</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className={styles.btnOutline}
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles.btnPrimary}>
                    <Save size={16} /> Save Design
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
