import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';


class CampaignShow extends Component {

    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();

        console.log(summary);
        return {

            minimumContribution: summary[0],
            balance: summary[1],
            requestCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]

        };
    }

    rendersCards() {

        const {
            balance,
            manager,
            minimumContribution,
            requestCount,
            approversCount
        } = this.props;

        const items = [{
            header: manager,
            meta: 'Address of Manager',
            description: 'The manager created this campaign and can create request to withdraw money',
            style: { overflowWrap: 'break-word' }
        },


        {
            header: minimumContribution,
            meta: 'Minimun Contribution (wei)',
            description: 'Tou must contribute at least this much wei to become anapprover'
        }

        ];

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h3>Welcome to the show page!!!</h3>
                {this.rendersCards()}
            </Layout>
        );
    }

}

export default CampaignShow;