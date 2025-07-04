import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import admin from './admin';


const getMenuItems = () => {
  const checkUserString = localStorage.getItem("user");
  let checkUser;

  try {
    checkUser = JSON.parse(checkUserString);
    console.log('ROLE:', checkUser?.role); 
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
  }

  const items = [dashboard, pages];

  if (checkUser?.role === 'admin') {
    items.push(admin);
  }

  // items.push(utilities, other);

  return { items };
};

export default getMenuItems;
