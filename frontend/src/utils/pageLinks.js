import Dashboard from "../pages/authuser/Dashboard";
import Exchange from "../pages/authuser/Exchange";
import ProductsTools from "../pages/authuser/ProductsTools";
import Profile from "../pages/authuser/Profile";
import AirdropsPage from "../pages/general/AirdropsPage";
import Blogs from "../pages/general/Blogs";
import ContactPage from "../pages/general/ContactPage";
import ForgotPassword from "../pages/general/ForgotPassword";
import HomePage from "../pages/general/HomePage";
import LoginPage from "../pages/general/LoginPage";
import Notfound from "../pages/general/Notfound";
import PrivacyPolicy from "../pages/general/PrivacyPolicy";
import ProductsPage from "../pages/general/ProductsPage";
import SignUpPage from "../pages/general/SignUpPage";
import SingleProductPage from "../pages/general/SingleProductPage";
import TermsPage from "../pages/general/TermsPage";
import VerifyAccount from "../pages/general/VerifyAccount";

export const GeneralPagesLinks = [
    { path: '*', component: Notfound },
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/signup', component: SignUpPage },
    { path: '/verify-account', component: VerifyAccount },
    { path: '/forgot-password', component: ForgotPassword },
    { path: '/terms', component: TermsPage },
    { path: '/privacy-policy', component: PrivacyPolicy },
    { path: '/airdrops', component: AirdropsPage },
    { path: '/contact', component: ContactPage },
    { path: '/products', component: ProductsPage },
    { path: '/blogs', component: Blogs },
    { path: '/products/:id', component: SingleProductPage },
]

export const AuthPagesLinks = [
    { path: '/dashboard', component: Dashboard },
    { path: '/exchange', component: Exchange },
    { path: '/profit_tools', component: ProductsTools },
    { path: '/profile', component: Profile},
]