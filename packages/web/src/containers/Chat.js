import requireAuth from '../components/RequireAuth';
import React from 'react';


class Chat extends React.Component {
    render() {
        return (
            <div>CHAT</div>
        )
    }
}

export default requireAuth(Chat);