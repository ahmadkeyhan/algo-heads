
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

function WalletAddress() {
  const router = useRouter()
  const { walletAddress } = router.query
  
  const [sholderWallet, setSholderWallet] = useState([])
  const[sales, setSales] = useState()
  const [isLoading, setLoading] = useState()
  useEffect(() => {
      setLoading(true)
      fetch('../pages/api/nftx')
        .then((res) => res.json())
        .then((data) => {
          // data.message.sales.reverse()
          // console.log(data)
          setSales(data.message.sales)
          setLoading(false)
        })
  }, [])
  // console.log(walletAddress, sales)

  if(sales && walletAddress) {
    for (var i = 0; i<sales.length; i++) {
      console.log(sales[i].reciever)
      if(sales[i].reciever === walletAddress) {
        console.log(sales[i].nftxUrl.slice(30)*1) 
      }
    }
   //console.log(sholderWallet, walletAddress)
    return (
      <p></p>
    )
  } 

}

export default WalletAddress