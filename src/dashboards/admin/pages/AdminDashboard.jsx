

import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  User as UserIcon,
  ChevronDown,
  Moon,
  Sun,
  Calendar,
  Settings,
  LogOut,
  UserCircle
} from 'lucide-react';

import { formatDate } from '../../../utils/dateUtils';
import AdminSidebar from '../components/AdminSidebar';

// Modules
import DashboardOverview from '../modules/DashboardOverview';
import UserManagement from '../modules/UserManagement';
import ProjectManagement from '../modules/ProjectManagement';
import CompanySettings from '../modules/CompanySettings';
import GeneralSettings from '../modules/GeneralSettings';
import Reports from '../modules/Reports';
import Invoices from '../modules/Invoices';
import Plans from '../modules/Plans';
import Logs from '../modules/Logs';

import './AdminDashboard.css';

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const profileRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'users':
        return <UserManagement />;
      case 'company-settings':
        return <CompanySettings />;
      case 'projects':
        return <ProjectManagement />;
      case 'invoices':
        return <Invoices />;
      case 'reports':
        return <Reports />;
      case 'plans':
        return <Plans />;
      case 'settings':
        return <GeneralSettings />;
      case 'logs':
        return <Logs />;
      default:
        return <DashboardOverview />;
    }
  };

  const getTabTitle = () => {
    const titles = {
      overview: 'Dashboard Overview',
      projects: 'Project Management',
      'company-settings': 'Company Settings',
      invoices: 'Billing & Invoices',
      reports: 'Reports & Analytics',
      plans: 'Billing & Plans',
      settings: 'General Settings',
      logs: 'System Logs'
    };

    return titles[activeTab] || 'Admin Dashboard';
  };

  return (
    <div className={`dashboard-root ${isDarkMode ? 'dark-mode' : ''}`}>
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
      />

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <h1 className="page-title">{getTabTitle()}</h1>
          </div>

          <div className="topbar-right">
            <div className="topbar-date">
              <Calendar size={16} />
              <span>{formatDate()}</span>
            </div>

            <div className="topbar-actions">
              <button
                className="action-icon-btn"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <div className="notification-wrapper">
                <button className="action-icon-btn">
                  <Bell size={20} />
                  <span className="notif-badge"></span>
                </button>
              </div>

              <div className="v-divider" />

              {/* USER PROFILE */}
              <div
                className="user-profile-container"
                ref={profileRef}
              >
                <div
                  className="user-profile-dropdown"
                  onClick={() =>
                    setShowProfileMenu(!showProfileMenu)
                  }
                >
                  <div className="avatar-small">
                    <UserIcon size={18} />
                  </div>

                  <div className="user-info">
                    <span className="u-name">
                      {user?.fullName || 'Admin User'}
                    </span>

                    <span className="u-role">
                      {user?.role || 'Administrator'}
                    </span>
                  </div>

                  <ChevronDown
                    size={14}
                    className={`dropdown-arrow ${
                      showProfileMenu ? 'rotate' : ''
                    }`}
                  />
                </div>

                {showProfileMenu && (
                  <div className="profile-menu">
                    <div className="profile-menu-header">
                      <div className="big-avatar">
                        <UserCircle size={42} />
                      </div>

                      <div>
                        <h4>{user?.fullName || 'Admin User'}</h4>
                        <p>{user?.email || 'admin@crm.com'}</p>
                      </div>
                    </div>

                    <div className="profile-menu-items">
                      <button className="profile-menu-btn">
                        <Settings size={16} />
                        Settings
                      </button>

                      <button
                        className="profile-menu-btn logout-btn"
                        onClick={onLogout}
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="dashboard-viewport">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;



