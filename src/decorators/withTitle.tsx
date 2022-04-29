import React, { Component } from 'react';

const withTitle = getTitle => WrappedComponent => {
    return class CustomTitleComponent extends Component<any> {
        componentDidMount() {
            document.title = getTitle(this.props);
        }

        componentDidUpdate() {
            document.title = getTitle(this.props);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
};

export default withTitle;
