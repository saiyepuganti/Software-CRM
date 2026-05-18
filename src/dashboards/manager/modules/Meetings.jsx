import { useState } from 'react';
import {
  CalendarDays,
  Clock3,
  Users,
  Video,
  Plus,
  Search,
  Bell,
  CheckCircle,
  XCircle,
} from 'lucide-react';

const meetingsData = [
  {
    id: 1,
    title: 'Client Demo Meeting',
    type: 'Online',
    date: '2026-05-18',
    time: '10:00 AM',
    participants: 5,
    status: 'Scheduled',
    platform: 'Google Meet',
  },
  {
    id: 2,
    title: 'Development Sprint Review',
    type: 'Offline',
    date: '2026-05-19',
    time: '2:30 PM',
    participants: 8,
    status: 'Completed',
    platform: 'Office',
  },
  {
    id: 3,
    title: 'Sales Follow-up Call',
    type: 'Online',
    date: '2026-05-20',
    time: '4:00 PM',
    participants: 3,
    status: 'Pending',
    platform: 'Zoom',
  },
];

export default function Meetings() {
  const [search, setSearch] = useState('');

  const filteredMeetings = meetingsData.filter((meeting) =>
    meeting.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-white p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Meetings Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Manage team meetings, demos, and schedules.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl shadow-lg transition-all">
          <Plus size={18} />
          Create Meeting
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-500">Total Meetings</p>
            <h2 className="text-3xl font-bold mt-2">24</h2>
          </div>
          <CalendarDays className="text-blue-600" size={40} />
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-500">Upcoming</p>
            <h2 className="text-3xl font-bold mt-2">12</h2>
          </div>
          <Clock3 className="text-orange-500" size={40} />
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-500">Completed</p>
            <h2 className="text-3xl font-bold mt-2">8</h2>
          </div>
          <CheckCircle className="text-green-500" size={40} />
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-500">Cancelled</p>
            <h2 className="text-3xl font-bold mt-2">4</h2>
          </div>
          <XCircle className="text-red-500" size={40} />
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-5 mb-8 flex items-center gap-3">
        <Search className="text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search meetings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-gray-700"
        />
      </div>

      {/* Meetings Table */}
      <div className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
        <div className="p-5 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Scheduled Meetings
          </h2>

          <button className="flex items-center gap-2 bg-gradient-to-br from-slate-100 via-blue-50 to-white hover:bg-gray-200 px-4 py-2 rounded-xl text-sm transition-all">
            <Bell size={16} />
            Notifications
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4">Meeting</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Participants</th>
                <th className="px-6 py-4">Platform</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredMeetings.map((meeting) => (
                <tr
                  key={meeting.id}
                  className="border-b hover:bg-blue-50 transition-all"
                >
                  <td className="px-6 py-5">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {meeting.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {meeting.type} Meeting
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {meeting.date}
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {meeting.time}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users size={16} />
                      {meeting.participants}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Video size={16} />
                      {meeting.platform}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        meeting.status === 'Scheduled'
                          ? 'bg-blue-100 text-blue-700'
                          : meeting.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {meeting.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex gap-3">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm transition-all">
                        View
                      </button>

                      <button className="bg-gradient-to-br from-slate-100 via-blue-50 to-white hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm transition-all">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            AI Meeting Insights
          </h2>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl">
              <p className="text-gray-700">
                AI suggests scheduling meetings between 10:00 AM - 12:00 PM for
                maximum employee availability.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-2xl">
              <p className="text-gray-700">
                Team meeting completion rate improved by 18% this month.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Upcoming Schedule
          </h2>

          <div className="space-y-4">
            {filteredMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl"
              >
                <div>
                  <h3 className="font-medium text-gray-800">
                    {meeting.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {meeting.date} • {meeting.time}
                  </p>
                </div>

                <CalendarDays className="text-blue-600" size={24} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
