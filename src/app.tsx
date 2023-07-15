import { Partytown } from '@builder.io/partytown/react';
import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import AuthService from './api/v1/auth';
import { setUser } from './store/auth';
import { deleteCookie, getCookie } from './utils/cookie';
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

interface State {
  token: string | null;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      token: getCookie('token'),
    };
  }

  componentDidMount(): void {
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
    const token = this.state.token;
    return (
      <>
        <Partytown forward={['dataLayer.push']} />
        {this.props.children}
        <ToastContainer />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
