import React from 'react';
import { connect } from 'react-redux';
import { deleteCookie, getCookie } from './utils/cookie';
import AuthService from './api/v1/auth';
import { setUser } from './store/auth';
import { ToastContainer } from 'react-toastify';
import ReactGA from 'react-ga';

function mapStateToProps(state: any) {
  return {
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    setUser: (user: any) => dispatch(setUser(user)),
  };
}

interface Props {
  children: React.ReactNode;
  user: any;
  setUser: (user: any) => void;
}

class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount(): void {
    // Google Analytics
    ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);

    const token = getCookie('token');
    if (token && !this.props.user) {
      this.fetchUser();
    }
  }

  fetchUser = async () => {
    const token = getCookie('token');
    if (token && !this.props.user) {
      try {
        const authService = new AuthService();
        const user = await authService.getMe();
        if (user) {
          this.props.setUser(user);
        }
      } catch (error) {
        deleteCookie('token');
        window.location.href = '/login';
      }
    }
  };

  render(): React.ReactNode {
    return (
      <>
        {this.props.children}
        <ToastContainer />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
