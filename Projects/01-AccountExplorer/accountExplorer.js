import { LightningElement, wire } from 'lwc';
import {gql, graphql} from 'lightning/uiGraphQLApi';

const ACCOUNT_QUERY = gql`
query{
    uiapi{
        query{
            Account(first:5) {
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
}`

export default class AccountExplorer extends LightningElement {

    accounts = [];
    error;
    data;
    columns = [
        {
            label : 'Account Name',
            fieldName : 'name',
            type : 'text'
        },
        {
            label : 'Industry',
            fieldName : 'industry',
            type:'text'
        }
    ];

    @wire(graphql,{
        query: ACCOUNT_QUERY
    })
    /*wiredAccounts({ data, errors }) {
    if (data) {
        this.accounts = data.uiapi.query.Account.edges.map(edge => ({
            id: edge.node.Id,
            name: edge.node.Name?.value,
            industry: edge.node.Industry?.value
        }));

        this.error = undefined;
    }
}Notice the parentheses () around the object. They're needed so JavaScript knows you're returning an object literal. */
    wiredAccounts({ data, errors }) {
        if (data) {
            this.accounts = data.uiapi.query.Account.edges.map(edge => {
                return {
                    id: edge.node.Id,
                    name: edge.node.Name?.value,
                    industry: edge.node.Industry?.value
            };
            });
            this.error = undefined;
        }
        if(errors){
            this.error = errors;
            this.accounts = [];
        }
    }
}
