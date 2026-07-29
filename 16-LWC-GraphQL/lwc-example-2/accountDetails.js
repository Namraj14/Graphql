import { LightningElement, api, wire } from 'lwc';
import { gql, graphql } from 'lightning/graphql';

const ACCOUNT_QUERY = gql`
query GetAccount($recordId: ID!) {

    uiapi {

        query {

            Account(

                where: {

                    Id: {

                        eq: $recordId

                    }

                }

            ) {

                edges {

                    node {

                        Name {
                            value
                        }

                        Industry {
                            value
                        }

                        Phone {
                            value
                        }

                        Owner {

                            Name {
                                value
                            }

                        }

                    }

                }

            }

        }

    }

}
`;

export default class AccountDetails extends LightningElement {

    @api recordId;

    account;
    errors;

    get variables() {

        return {

            recordId: this.recordId

        };

    }

    @wire(graphql, {

        query: ACCOUNT_QUERY,

        variables: '$variables'

    })

    wiredAccount({ data, errors }) {

        if (data) {

            this.account =
                data.uiapi.query.Account.edges[0].node;

        }

        if (errors) {

            this.errors = errors;

        }

    }

}
