import withTitle from "../decorators/withTitle";
import React, {Component} from "react";
import Timeline from "../components/Timeline/Timeline";

import {connect} from "react-redux";
import {loadOperations} from "../redux/operations/actions";


class TimelinePage extends Component<any, any> {
    componentDidMount() {
        this.fetchOperations();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.accountId !== this.props.match.params.accountId) {
            this.fetchOperations();
        }
    }

    fetchOperations = () => this.props.loadOperations(this.props.match.params.accountId);

    render() {
        const {operations} = this.props;

        if (!operations) {
            return <h2>Подождите, идет загрузка</h2>;
        }

        return operations.length > 0 ? (
            <div>
                <h2>Список операций</h2>
                <Timeline items={operations}/>
            </div>
        ) : (
            <h2>По данному аккаунту нет операций</h2>
        );
    }
}


const mapStateToProps = state => ({operations: state.operations});
const mapDispatchToProps = dispatch => ({ loadOperations: accountId => dispatch(loadOperations(accountId)) });

const createPageTitle = ({match, accounts}) => {
    if (!accounts || accounts.length === 0) {
        return 'Подождите, идет загрузка...';
    }

    const accountId = Number(match.params.accountId);
    const account = accounts.find(a => a.id === accountId);

    return account ? `История операций: ${account.title}` : 'Аккаунт отсутствует';
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTitle(createPageTitle)(TimelinePage));
