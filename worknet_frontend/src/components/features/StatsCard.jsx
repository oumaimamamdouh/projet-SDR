import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const StatsCard = ({ stat }) => {
  const isPositive = stat.change.startsWith('+');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-lg bg-green-50 text-green-600">
          {stat.icon}
        </div>
        <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
          {stat.change}
        </div>
      </div>
      
      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
      <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
    </div>
  );
};

export default StatsCard;