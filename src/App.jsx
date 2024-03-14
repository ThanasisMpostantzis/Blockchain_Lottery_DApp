import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';

function App() {
  

  const [carbids, setCarBids] = useState("0");
  const [phonebids, setPhoneBids] = useState("0");
  const [computerbids, setComputerBids] = useState("0");

  const [userAddress, setUserAddress] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [contractInstance, setContractInstance] = useState(null);
  const [contractBalance, setContractBalance] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [winnersRevealed, setWinnersRevealed] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const [bidButtonStyles, setBidButtonStyles] = useState({ backgroundColor: "#535bf2" });
  const [actionButtonStyles, setActionButtonStyles] = useState({ backgroundColor: "rgb(84, 68, 86)" });


  //Button click messages (alert).
  

  const withdraw = () => {
    alert("Contract balance has been withdrawn successfully !!!")
  };

  const reveal = () => {
    alert("Reveal ?????\nΗ λειτουργικότητα του Reveal είναι να\nεμφανίζονται πόσα λαχεία πουλήθηκαν και\nτο balance του contract\n\nΑυτά έχουν μεταφερθεί σε live προβολή ");
  };
  //end of button click messages (alert).





  useEffect(() => {
    const connectToMetaMask = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          console.log('Connected to MetaMask');

          // Fetch user address
          const accounts = await window.web3.eth.getAccounts();
          const currentUserAddress = accounts[0];
          setUserAddress(currentUserAddress);

          //Actual contract ABI and address
          const contractABI = [
            {
              "inputs": [],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "string",
                  "name": "_itemName",
                  "type": "string"
                },
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "winner",
                  "type": "address"
                }
              ],
              "name": "WinnerAnnounced",
              "type": "event"
            },
            {
              "inputs": [],
              "name": "Car",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "Computer",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "Phone",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "string",
                  "name": "_itemName",
                  "type": "string"
                }
              ],
              "name": "buyTicket",
              "outputs": [],
              "stateMutability": "payable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "carPoolLenght",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "computerPoolLenght",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "destroyContract",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "drawWinners",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "getBalance",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "phonePoolLenght",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "president",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "president2",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "reset",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "ticketPrice",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "total_tickets",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "transferOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "withdraw",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ]; // Contract ABI
          const contractAddress = '0x12f93f964afabe355d07c958e5afc98fe039c4b9'; // Contract address
          const contract = new window.web3.eth.Contract(contractABI, contractAddress);

          setContractInstance(contract);

          // Fetch contract owner address
          const ownerAddress = await contract.methods.president().call();
          setOwnerAddress(ownerAddress);

          const networkId = await web3.eth.net.getId();
          setIsConnected(networkId === 11155111);
        } catch (error) {
          console.error('User denied account access');
        }
      } else {
        console.error('MetaMask not detected');
      }
    };


    connectToMetaMask();
  }, []);



  useEffect(() => {
    const updateContractBalance = async () => {
      try {
        if (contractInstance) {
          
          const balanceInWei = await contractInstance.methods.getBalance().call();
          console.log('Balance updated:', balanceInWei);
          const balanceAsString = web3.utils.fromWei(balanceInWei, "ether").toString();
          setContractBalance(balanceAsString);
        }
      } catch (error) {
        console.error('Error updating contract balance:', error);
      }
    };

    const updateTotalTickets = async () => {
      try {
        const tickets = await contractInstance.methods.total_tickets().call();
        console.log('Total tickets:', tickets);
        const ticketsAsString = tickets.toString();
        setTotalTickets(ticketsAsString);
      } catch (error) {
        console.error('Error updating total tickets:', error);
      }
    };

    const updateCurrentAddress = async () => {
      const accounts = await window.web3.eth.getAccounts();
      const currentUserAddress = accounts[0];
      setUserAddress(currentUserAddress);
    }

    const updateItemTickets = async () => {
      const car = await contractInstance.methods.carPoolLength().call();
      const phone = await contractInstance.methods.phonePoolLength().call();
      const computer = await contractInstance.methods.computerPoolLength().call();

      setCarBids(car.toString());
      setPhoneBids(phone.toString());
      setComputerBids(computer.toString());
    }

    const updateButtonByAddress = async () => {
      const button_destroy = await document.getElementById("b1");
      const button_change_president = await document.getElementById("b2");
      const button_restart = await document.getElementById("b3");

      const button_amIwinner = await document.getElementById("Button1");
      const button_withdraw = await document.getElementById("Button2");
      const button_declareWinners = await document.getElementById("Button3");

      const bidButton1 = await document.getElementById("bidButton1");
      const bidButton2 = await document.getElementById("bidButton2");
      const bidButton3 = await document.getElementById("bidButton3");

      if(ownerAddress == userAddress){
        bidButton1.style.backgroundColor = "rgb(84, 68, 86)";
        bidButton2.style.backgroundColor = "rgb(84, 68, 86)";
        bidButton3.style.backgroundColor = "rgb(84, 68, 86)";
        button_amIwinner.style.backgroundColor = "rgb(84, 68, 86)";
        button_destroy.style.backgroundColor = "#535bf2";
        button_change_president.style.backgroundColor = "#535bf2";
        button_restart.style.backgroundColor = "#535bf2";
        button_withdraw.style.backgroundColor = "#535bf2";
        button_declareWinners.style.backgroundColor = "#535bf2";
      }
      if(!(ownerAddress == userAddress)){
        bidButton1.style.backgroundColor = "#535bf2";
        bidButton2.style.backgroundColor = "#535bf2";
        bidButton3.style.backgroundColor = "#535bf2";
        button_amIwinner.style.backgroundColor = "#535bf2";
        button_destroy.style.backgroundColor = "rgb(84, 68, 86)";
        button_change_president.style.backgroundColor = "rgb(84, 68, 86)";
        button_restart.style.backgroundColor = "rgb(84, 68, 86)";
        button_withdraw.style.backgroundColor = "rgb(84, 68, 86)";
        button_declareWinners.style.backgroundColor = "rgb(84, 68, 86)";
      }
    }

    
    // Fetch initial data
    updateContractBalance();
    updateTotalTickets();
    updateCurrentAddress();
    updateItemTickets();
    updateButtonByAddress();
    

    // Set up interval to update data every 10 seconds (adjust as needed)
    const intervalId = setInterval(() => {
      updateContractBalance();
      updateTotalTickets();
      updateCurrentAddress();
      updateItemTickets();
      updateButtonByAddress();
    }, 1000);


    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
      console.log('Internal cleared');
    }
  }, [contractInstance]);



  const bid = async (item) => {
    if(ownerAddress == userAddress){
      alert("President cant Bid.");
      return;
    }
    if(winnersRevealed){
      alert("Winners Revealed, wait for the next lottery round.");
      return;
    }
    try {
      // Εκτέλεση του συμβολαίου buyTicket με το όνομα του αντικειμένου (item)
      await contractInstance.methods.buyTicket(item).send({
        from: userAddress,
        value: window.web3.utils.toWei("0.01", "ether"), // Υποθέτοντας ότι η τιμή είναι 1 ether
      });

      
  
      alert(`Bid for ${item} successfull!`);
    } catch (error) {
      console.error("Error placing bid:", error.message);
      alert(`Error placing bid for ${item}: ${error.message}`);
    }
  };

  const revealWinners = async () => {
    if(!(ownerAddress == userAddress)){
      alert("Users can not reveal Winners.");
      return;
    }
    try {
      console.log("Calling drawWinners method...");
      await contractInstance.methods.drawWinners().send({ from: userAddress });
      setWinnersRevealed(true);
      console.log("Transaction successful!");
      alert("Winners have been declared for this round of the lottery !!!");
    } catch (error) {
      console.error("Error drawing winners:", error);
      alert("Error drawing winners: " + error.message);
    }
  };
  
  const amIaWinner = async () => {
    if((ownerAddress == userAddress)){
      alert("President can not check if is a winner.");
      return;
    }
    if(!winnersRevealed){
      alert("Winners have not been revealed yet. Please wait for president to reveal them.");
      return;
    }
    try {
      const isCarWinner = await contractInstance.methods.Car().call() === userAddress;
      const isPhoneWinner = await contractInstance.methods.Phone().call() === userAddress;
      const isComputerWinner = await contractInstance.methods.Computer().call() === userAddress;
      var winnerItemNum = "", winnerItemNum1 = "", winnerItemNum2 = "", winnerItemNum3 = "";

      if (isCarWinner) {
        winnerItemNum1 = 1;
        //alert("You are the winner of the Car!");
      }
      if (isPhoneWinner) {
        winnerItemNum2 = 2;
        //alert("You are the winner of the Phone!");
      }
      if (isComputerWinner) {
        winnerItemNum3 = 3;
        //alert("You are the winner of the Computer!");
      }
      if(!isCarWinner && !isPhoneWinner && !isComputerWinner) {
        winnerItemNum = 0;
        //alert("You are not a winner in this round.");
      }
      alert("If you are a winner\nyou are the winner of the " + winnerItemNum + " "+ winnerItemNum1 + " "+ winnerItemNum2 + " "+ winnerItemNum3 + " item");

    } catch (error) {
      console.error("Error checking winner status:", error);
      alert("Error checking winner status: " + error.message);
    } finally {
      isCarWinner = null;
      isPhoneWinner = null;
      isComputerWinner = null;
    }
  };

  const withdrawToOwner = async () => {
    if(!(ownerAddress == userAddress)){
      alert("Users can not withdraw any amount !!!");
      return;
    }
    try{
      await contractInstance.methods.withdraw().send({ from: ownerAddress });
    }catch (error) {
      alert("Withdraw failed after calcelation.")
    }
  };

  const startup_owner = async () => {
    if(!(ownerAddress == userAddress)){
      alert("Users can not reset the contract !!!");
      return;
    }
    try{
      await contractInstance.methods.reset().send({ from: ownerAddress });
    }catch (error) {
      alert("Contract Reset failed.", error);
    }
  };

  const destroy = async () => {
    if(!(ownerAddress == userAddress)){
      alert("Users can not destroy the contract !!!");
      return;
    }
    try{
      await contractInstance.methods.destroyContract().send({from: ownerAddress});
    }catch (error){
      alert("Destroy failed.", error);
    }
  }
  
  const change_owner = async () => {
    if(!(ownerAddress == userAddress)){
      alert("Users can not change the contract of contract!!!");
      return;
    }
    try{
      var newOwnerAddress = document.getElementById("owner_address").value;
      await contractInstance.methods.transferOwnership(newOwnerAddress).send({from: ownerAddress});
    }catch (error){
      alert("Change of the OwnerShip failed." + error.message);
    }
  }
  

  return (
    <div>
      {/**/}
      <h1 className="lottery-title">Lottery - Ballot</h1>
      <div className = "contract_balance">
        <h2>Balance</h2>
        <input className="balance" value={contractBalance} readOnly />
      </div>
      <div className = "total_tickets">
        <h2 className= "ticketh2">Total Tickets</h2>
        <input className="tickets" value={totalTickets} readOnly />
      </div>
      <div>
      <div className="box-container">
        <div className="box">
          <h2>Car</h2>
          <img src="https://github.com/ThanasisMpostantzis/Blockchain_Lottery_DApp/blob/main/src/car.jpg" alt="Car Image" width="150" />
          <button id='bidButton1' className="bid-button" onClick={() => bid('car')}>
            Bid
          </button>
          <p className="counter"> {carbids} Bids</p>
        </div>

        <div className="box">
          <h2>Phone</h2>
          <img src="https://github.com/ThanasisMpostantzis/Blockchain_Lottery_DApp/blob/main/src/phone.jpg" alt="Phone Image" width="150" />
          <button id='bidButton2' className="bid-button" onClick={() => bid('phone')}>
            Bid
          </button>
          <p className="counter">{phonebids} Bids</p>
        </div>

        <div className="box">
          <h2>Computer</h2>
          <img id='computerImg' src="https://github.com/ThanasisMpostantzis/Blockchain_Lottery_DApp/blob/main/src/computer.jpg" alt="Computer Image" width="150" />
          <button id='bidButton3' className="bid-button" onClick={() => bid('computer')}>
            Bid
          </button>
          <p className="counter">{computerbids} Bids</p>
        </div>
      </div>
    </div>
      {/**/}
      <div className="accounts">
        <div className="user_account">
          <h2>Current Account:</h2>
          <input id='user_input' className="user_address" value={userAddress} readOnly />
          <div>
            <button className="button_reveal" onClick={() => {reveal(); setIsOpen(true); }}>Reveal</button>
          </div>
          <div>
            <button id='Button1' className="button_amIwinner" onClick={() => { amIaWinner(); setIsOpen(true); }}>Am I Winner</button>
          </div>
        </div>
        <div className="owner_account">
          <h2>Owners Account:</h2>
          <input id='owner_input' className="owner_address" value={ownerAddress} readOnly />
          <div>
            <button id='Button2' className="button_withdraw" onClick={() => {withdrawToOwner(); setIsOpen(true); }}>Withdraw</button>
          </div>
          <div>
            <button id='Button3' className="button_declare" onClick={() => {revealWinners(); setIsOpen(true);; }}>Declare Winner</button>
          </div>
        </div>
      </div>
      <div>
        <h3 className="h3Message">President can only Declare the Winners when all of the 3 items have more than 0 bids</h3>
      </div>
      <div>
        <button id='b1' className='destroy_button'onClick={() => {destroy(); setIsOpen(true) }}>Destroy Contract</button>
        <button id='b2' className='change_president'onClick={() => {change_owner(); setIsOpen(true) }}>Change President</button>
        <button id='b3' className='owner_startup_button' onClick={() => {startup_owner(); setIsOpen(true) }}>Restart Lottery</button>
      </div>
      <div>
        <input placeholder='New owner address' id='owner_address' className='new_owner_address'></input>
      </div>
    </div>
    
  );
}

export default App;
