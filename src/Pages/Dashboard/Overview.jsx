import { BarChart2, Users, DollarSign, ShoppingCart } from "lucide-react";

export default function Overview() {
  return (
    <div className="p-6 space-y-6 animate-in slide-in-from-bottom fade-in duration-500">
      {/* Page Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors">
          New Report
        </button>
      </header>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-lg shadow flex items-center space-x-4 animate-in zoom-in duration-300">
          <Users className="h-6 w-6 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Users</p>
            <p className="text-lg font-bold">1,245</p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow flex items-center space-x-4 animate-in zoom-in duration-300">
          <ShoppingCart className="h-6 w-6 text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Orders</p>
            <p className="text-lg font-bold">347</p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow flex items-center space-x-4 animate-in zoom-in duration-300">
          <DollarSign className="h-6 w-6 text-yellow-500" />
          <div>
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-lg font-bold">$12,540</p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow flex items-center space-x-4 animate-in zoom-in duration-300">
          <BarChart2 className="h-6 w-6 text-purple-500" />
          <div>
            <p className="text-sm text-gray-500">Analytics</p>
            <p className="text-lg font-bold">89%</p>
          </div>
        </div>
      </div>

      {/* Charts / Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg shadow animate-in slide-in-from-left fade-in duration-300">
          <h2 className="text-xl font-semibold mb-4">Monthly Revenue</h2>
          <div className="h-48 bg-gray-100 rounded flex items-center justify-center text-gray-400">
            Chart Placeholder
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow animate-in slide-in-from-right fade-in duration-300">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="p-2 rounded hover:bg-gray-50 transition-colors">User John signed up</li>
            <li className="p-2 rounded hover:bg-gray-50 transition-colors">Order #2342 completed</li>
            <li className="p-2 rounded hover:bg-gray-50 transition-colors">New invoice generated</li>
            <li className="p-2 rounded hover:bg-gray-50 transition-colors">Server maintenance scheduled</li>
          </ul>
        </div>
      </div>

      {/* Footer / Additional Section */}
      <div className="p-6 bg-white rounded-lg shadow animate-in slide-in-from-bottom fade-in duration-300">
        <h2 className="text-xl font-semibold mb-4">Tasks</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="p-2 rounded border border-gray-200">Update dashboard layout</li>
          <li className="p-2 rounded border border-gray-200">Implement new analytics chart</li>
          <li className="p-2 rounded border border-gray-200">Review user feedback</li>
        </ul>
      </div>
    </div>
  );
}
