import MyAlgoConnect from '@randlabs/myalgo-connect'

export const myAlgoConnect = new MyAlgoConnect({ disableLedgerNano: false })
export const settings = {
        shouldSelectOneAccount: true,
        openManager: true
      }

