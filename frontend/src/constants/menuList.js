import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';

export const MenuList = [
  {
    id: "home",
    title: "Home",
    url: "/",
    icon: HomeIcon,
  },
  {
    id: "products",
    title: "Productos",
    url: "/products",
    icon: InventoryIcon,
  },
  {
    id: "clients",
    title: "Clientes",
    url: "/clients",
    icon: PersonIcon,
  }
]