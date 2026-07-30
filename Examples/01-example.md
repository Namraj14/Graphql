query {                    ← GraphQL operation (READ data). Similar to a SOQL SELECT.

  uiapi {                  ← Enter Salesforce's UI API namespace.
                             All Salesforce GraphQL record queries start here.

    query {                ← The UI API's query service.
                             This is where you query Salesforce objects.

      Account(first: 5) {  ← Query the Account object.
                             first: 5 = return only the first 5 Account records.
                             Similar to SOQL: LIMIT 5

        edges {            ← A collection of results.
                             Think of it as a wrapper around every returned record.
                             Used for pagination (Relay Connection Model).

          node {           ← The actual Salesforce Account record.
                             Every Account is inside a node.

            Id             ← Return the Salesforce Record Id.

            Name {         ← Name is not returned directly.
                             Salesforce wraps many fields as objects.

              value        ← Return the actual Account Name.
                             Example: "Acme Corporation"

            }

          }

        }

      }

    }

  }

}
