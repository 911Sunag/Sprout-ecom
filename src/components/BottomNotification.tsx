import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { setNotification } from '../store/cartSlice';

const BottomNotification = () => {
  const notification = useSelector((state: RootState) => state.cart.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(setNotification(null));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  if (!notification) return null;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white shadow-xl rounded-full px-6 py-3 flex items-center space-x-4 border border-gray-100">
        <div className="font-bold text-red-500">Limit Reached</div>
        <div className="text-sm font-medium text-gray-600">{notification}</div>
        <button
          onClick={() => dispatch(setNotification(null))}
          className="ml-2 text-sm text-gray-400 hover:text-gray-800 font-medium transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BottomNotification;
