import { faUser, faHome, faStethoscope, faCalendarAlt, faCommentAlt, faClipboard, faChartBar, faPaste, faBook, faCalendarCheck, faGift, faUsers, faBell, faUserAltSlash, faServer, faPhone, faAnchor, faVideo, faUnlink, faLink, faLock, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import Analytic from '../screen/Analytic';
import Calendar from '../screen/Calendar';
import Home from '../screen/Home';
import Messaging from '../screen/Messaging';
import Patient from '../screen/Patient';
import PatientChat from '../screen/PatientChat';
import PatientDetail from '../screen/PatientDetail';
import Plan from '../screen/Plan';
import PlanEdit from '../screen/PlanEdit';
import Profile from '../screen/Profile';
import Report from '../screen/Report';
import Resource from '../screen/Resource';
import ResourceEdit from '../screen/ResourceEdit';
import Survey from '../screen/Survey';
import SurveyEdit from '../screen/SurveyEdit';
import SecureMessaging from '../screen/ZoomIntegration';
import ZoomIntegration from '../screen/SecureMessaging';
import { ROLE_ADMIN, ROLE_AGENT, ROLE_PROVIDER } from '../store/constants';
import EmrConnection from '../screen/EmrConnection';
import ServerSetting from '../screen/ServerSetting';
import MobileSetting from '../screen/MobileSetting';
import BlockUser from '../screen/BlockUser';
import Notification from '../screen/Notification';
import User from '../screen/User';
import Reward from '../screen/Reward';
import PlanDetail from '../screen/PlanDetail';
import AdminMessaging from '../screen/AdminMessaging';
import RewardEdit from '../screen/RewardEdit';
import UserEdit from '../screen/UserEdit';
import UserDetail from '../screen/UserDetail';
import PatientEdit from '../screen/PatientEdit';

export default {
    getRouteRules() {
        return [
            { link: "/", label: "Home", component: <Home />, icon: faHome, roles: [ROLE_ADMIN, ROLE_AGENT, ROLE_PROVIDER] },
            { link: "/profile", label: "Profile", component: <Profile />, icon: faUser, roles: [ROLE_ADMIN, ROLE_AGENT, ROLE_PROVIDER] },
            {
                link: "/patient", label: "Contacts/Patients", component: <Patient />, icon: faStethoscope, roles: [ROLE_ADMIN, ROLE_AGENT, ROLE_PROVIDER],
                children: [
                    { link: "/patient/chat/:id", label: "Patient Chat", component: <PatientChat /> },
                    { link: "/patient/edit/:id", label: "Patient Edit", component: <PatientEdit /> },
                    { link: "/patient/detail/:id", label: "Patient Detail", component: <PatientDetail /> },
                ]
            },
            { link: "/calendar", label: "Calendar", component: <Calendar />, icon: faCalendarAlt, roles: [ROLE_ADMIN, ROLE_AGENT, ROLE_PROVIDER] },
            { link: "/admin-messaging", label: "Messaging", component: <AdminMessaging />, icon: faCommentAlt, roles: [ROLE_ADMIN] },
            { link: "/messaging", label: "Messaging", component: <Messaging />, icon: faCommentAlt, roles: [ROLE_AGENT, ROLE_PROVIDER] },
            {
                link: "/survey", label: "PowerUps", component: <Survey />, icon: faPaste, roles: [ROLE_ADMIN, ROLE_PROVIDER],
                children: [
                    { link: "/survey/edit/:id", label: "Edit PowerUps", component: <SurveyEdit /> },
                    { link: "/survey/create", label: "Add new PowerUps", component: <SurveyEdit /> },
                ]
            },
            {
                link: "/resource", label: "Resource", component: <Resource />, icon: faBook, roles: [ROLE_ADMIN, ROLE_PROVIDER],
                children: [
                    { link: "/resource/edit/:id", label: "Edit resource", component: <ResourceEdit /> },
                    { link: "/resource/create", label: "Add new resource", component: <ResourceEdit /> },
                ]
            },
            {
                link: "/plan", label: "Plan Management", component: <Plan />, icon: faCalendarCheck, roles: [ROLE_ADMIN, ROLE_PROVIDER],
                children: [
                    { link: "/plan/edit/:id", label: "Edit plan", component: <PlanEdit /> },
                    { link: "/plan/create", label: "Add new plan", component: <PlanEdit /> },
                    { link: "/plan/detail/:id", label: "Plan detail", component: <PlanDetail /> },
                ]
            },
            {
                link: "/reward", label: "Rewards", component: <Reward />, icon: faGift, roles: [ROLE_ADMIN],
                children: [
                    { link: "/reward/edit/:id", label: "Edit reward", component: <RewardEdit /> },
                    { link: "/reward/create", label: "Add new reward", component: <RewardEdit /> },
                ]
            },
            {
                link: "/user", label: "Agents/Providers", component: <User />, icon: faUsers, roles: [ROLE_ADMIN],
                children: [
                    { link: "/user/edit/:type/:id", label: "Edit user", component: <UserEdit /> },
                    { link: "/user/:type/create", label: "Add new user", component: <UserEdit /> },
                    { link: "/user/detail/:type/:id", label: "User Detail", component: <UserDetail /> },
                ]
            },
            { link: "/notification", label: "Notifications", component: <Notification />, icon: faBell, roles: [ROLE_ADMIN] },
            { link: "/block-user", label: "Block Users", component: <BlockUser />, icon: faUserAltSlash, roles: [ROLE_ADMIN] },
            { link: "/server-setting", label: "Server Settings", component: <ServerSetting />, icon: faServer, roles: [ROLE_ADMIN] },
            { link: "/mobile-setting", label: "Mobile Settings", component: <MobileSetting />, icon: faPhone, roles: [ROLE_ADMIN] },
            { link: "/reporting", label: "Reporting", component: <Report />, icon: faClipboard, roles: [ROLE_AGENT, ROLE_PROVIDER] },
            { link: "/analytics", label: "Analytics", component: <Analytic />, icon: faChartBar, roles: [ROLE_ADMIN, ROLE_AGENT, ROLE_PROVIDER] },
            //{ link: "/emr-connection", label: "EMR Connection", component: <EmrConnection />, icon: faLink, roles: [ROLE_ADMIN] },
            //{ link: "/secure-messaging", label: "Secure Messaging", component: <SecureMessaging />, icon: faShieldAlt, roles: [ROLE_ADMIN] },
            //{ link: "/zoom-integration", label: "Zoom Integration", component: <ZoomIntegration />, icon: faVideo, roles: [ROLE_ADMIN] },
        ];
    },

    getSidebarMenu(role_id) {
        let output = [];
        this.getRouteRules().forEach((item) => {
            if (item.roles.includes(role_id)) {
                delete item.children;
                delete item.component;
                output.push(item);
            }
        });
        return output;
    },

    getSwitchRoute() {
        let output = [];
        this.getRouteRules().forEach((item) => {
            output.push({
                path: item.link,
                children: item.component,
            });
            if (item.children != null && item.children.length > 0) {
                item.children.forEach((item2) => {
                    output.push({
                        path: item2.link,
                        children: item2.component,
                    });
                });
            }
        })

        return output.reverse();
    },

    getBreadCrumb(path) {
        let output = {};
        this.getRouteRules().forEach((item) => {
            output[item.link] = {
                label: item.label,
                link: item.link,
                parent: null
            };
            if (item.children != null && item.children.length > 0) {
                item.children.forEach((item2) => {
                    output[item2.link] = {
                        label: item2.label,
                        link: item2.link,
                        parent: item.link
                    };
                });
            }
        });

        //console.log("Output", output);

        let arrayOutput = [];

        while (true) {
            let item = output[path];
            if (item) {
                arrayOutput.push(item);
                path = item.parent
            } else {
                //arrayOutput.push(output["/"]);
                break;
            }
        }

        return arrayOutput.reverse();
    }
};