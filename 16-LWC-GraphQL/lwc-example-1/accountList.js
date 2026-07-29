import { LightningElement, wire } from 'lwc';
import { gql, graphql } from 'lightning/graphql';

const ACCOUNT_QUERY = gql`
query GetAccounts {

    uiapi {

        query {

            Account(first: 10) {

                edges {

                    node {

                        Id

                        Name {
                            value
                        }

                        Industry {
                            value
                        }

                    }

                }

            }

        }

    }

}
`;

export default class AccountList extends LightningElement {

    accounts;
    errors;

    @wire(graphql, {

        query: ACCOUNT_QUERY

    })

    wiredAccounts({ data, errors }) {

        if (data) {

            this.accounts =
                data.uiapi.query.Account.edges.map(edge => edge.node);

        }

        if (errors) {

            this.errors = errors;

        }

    }

}
