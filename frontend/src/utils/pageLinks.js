import Dashboard from "../pages/authuser/Dashboard";
import Exchange from "../pages/authuser/Exchange";
import Giftcards from "../pages/authuser/Giftcards";
import Profile from "../pages/authuser/Profile";
import AboutPage from "../pages/general/AboutPage";
import TransHistory from "../pages/authuser/TransHistory";
import AirdropsPage from "../pages/general/AirdropsPage";
import Blogs from "../pages/general/Blogs";
import CategoryAirdropsPage from "../pages/general/CategoryAirdrops";
import ContactPage from "../pages/general/ContactPage";
import ForgotPassword from "../pages/general/ForgotPassword";
import HomePage from "../pages/general/HomePage";
import LoginPage from "../pages/general/LoginPage";
import Notfound from "../pages/general/Notfound";
import PrivacyPolicy from "../pages/general/PrivacyPolicy";
import ProductsPage from "../pages/general/ProductsPage";
import SignUpPage from "../pages/general/SignUpPage";
import SingleAirdropPage from "../pages/general/SingleAirdropPage";
import SingleProductPage from "../pages/general/SingleProductPage";
import TermsPage from "../pages/general/TermsPage";
import VerifyAccount from "../pages/general/VerifyAccount";
import Notification from "../pages/authuser/Notification";
import CreateTools from "../pages/authuser/CreateTools";
import ProfitTools from "../pages/authuser/ProfitTools";
import Leaderboards from "../pages/authuser/Leaderboards";
import FAQS from "../pages/general/FAQS";
import BankWithdrawal from "../pages/authuser/BankWithdrawal";
import SingleBlog from "../pages/general/SingleBlog";
import SingleFeatureBlog from "../pages/general/SingleFeatureBlog";
import Hiring from "../pages/general/Hiring";
import SingleComment from "../pages/general/SingleComment";
import UserKYC from "../pages/authuser/UserKYC";
import AdminExchange from "../pages/authadmin/AdminExchange";
import AdminBankWithdrawals from "../pages/authadmin/AdminBankWithdrawals";
import AdminGiftCards from "../pages/authadmin/AdminGiftCards";
import AdminTools from "../pages/authadmin/AdminTools";
import AdminProfile from "../pages/authadmin/AdminProfile";
import AdminNotification from "../pages/authadmin/AdminNotification";
import AdminLeaderboards from "../pages/authadmin/AdminLeaderboards";
import AdminSettings from "../pages/authadmin/AdminSettings";

export const GeneralPagesLinks = [
    { path: '*', component: Notfound },
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/signup', component: SignUpPage },
    { path: '/verify-account', component: VerifyAccount },
    { path: '/forgot-password', component: ForgotPassword },
    { path: '/airdrops', component: AirdropsPage },
    { path: '/airdrops/:id/:slug', component: SingleAirdropPage },
    { path: '/airdrops/:category', component: CategoryAirdropsPage },
    { path: '/products', component: ProductsPage },
    { path: '/products/:id/:slug', component: SingleProductPage },
    { path: '/contact', component: ContactPage },
    { path: '/about', component: AboutPage },
    { path: '/blogs', component: Blogs },
    { path: '/terms_of_service', component: TermsPage },
    { path: '/faqs', component: FAQS },
    { path: '/privacy_policy', component: PrivacyPolicy },
    { path: '/we_are_hiring', component: Hiring },
    { path: '/blogs/:feature/:id', component: SingleBlog },
    { path: '/blogs/:feature/:id/comment/:commentid', component: SingleComment },
    { path: '/blogs/:feature', component: SingleFeatureBlog },
]

export const AuthPagesLinks = [
    { path: '/user/dashboard', component: Dashboard },
    { path: '/user/giftcards', component: Giftcards },
    { path: '/user/exchange', component: Exchange },
    { path: '/user/profit_tools/create', component: CreateTools },
    { path: '/user/profit_tools/all_tools', component: ProfitTools },
    { path: '/user/profile', component: Profile},
    { path: '/user/transactions_history', component: TransHistory},
    { path: '/user/notifications', component: Notification},
    { path: '/user/leaderboard', component: Leaderboards},
    { path: '/user/bank_withdrawal', component: BankWithdrawal},
    { path: '/user/profile/kyc', component: UserKYC },
]

export const AdminPagesLinks = [
    { path: '/admin/exchange', component: AdminExchange },
    { path: '/admin/giftcards', component: AdminGiftCards },
    { path: '/admin/profit_tools', component: AdminTools },
    { path: '/admin/bank_withdrawals', component: AdminBankWithdrawals },
    { path: '/admin/settings', component: AdminSettings },
    { path: '/admin/profile', component: AdminProfile },
    { path: '/admin/notifications', component: AdminNotification },
    { path: '/admin/leaderboard', component: AdminLeaderboards },
]