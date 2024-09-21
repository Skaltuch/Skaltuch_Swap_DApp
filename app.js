let web3;
let account;
let skaltuchetContract;
const contractAddress = '0xBb3ec909B1E4D5B265D522AD49D03dF548a6e702'; 
const skaltuchetABI = [ 
  {
      "inputs": [
        {
          "internalType": "address",
          "name": "initialOwner",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "allowance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "ERC20InsufficientAllowance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "ERC20InsufficientBalance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "approver",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidApprover",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidReceiver",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidSender",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidSpender",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amountOfETH",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amountOfTokens",
          "type": "uint256"
        }
      ],
      "name": "TokensPurchased",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "INITIAL_SUPPLY",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "TOKENS_PER_ETH",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
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
      "name": "buyTokens",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    }
];

async function init() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            web3 = new Web3(window.ethereum);
            
            const accounts = await web3.eth.getAccounts();
            account = accounts[0];
            
            skaltuchetContract = new web3.eth.Contract(skaltuchetABI, contractAddress);
            
            updateUI();
            updateTokenBalance();
            
            
            // Set up event listeners
            document.getElementById('swapTokensButton').addEventListener('click', swapTokens);
            document.getElementById('switchAccountButton').addEventListener('click', switchAccount);
            document.getElementById('connectButton').addEventListener('click', connectToMetaMask);
            
            // Listen for account changes
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        } catch (error) {
            console.error("Failed to load web3, accounts, or contract:", error);
            updateStatus('Failed to load web3, accounts, or contract. Check console for details.');
        }
    } else {
        console.error('MetaMask is not installed');
        displayWarning('Metamask is not installed. Please install it to continue');
    }
}

function updateUI() {
    const connectedAccountElement = document.getElementById('connectedAccount');
    const copyAddressBtn = document.getElementById('copyAddressBtn');
    const connectionStatus = document.querySelector('.connection-status');
    const accountHeader = document.querySelector('.account-header h2');
    const connectButton = document.getElementById('connectButton');
    const switchAccountButton = document.getElementById('switchAccountButton');
    
    if (account) {
        const truncatedAddress = `${account.slice(0, 6)}...${account.slice(-4)}`;
        connectedAccountElement.innerText = truncatedAddress;
        copyAddressBtn.style.display = 'inline-block';
        connectionStatus.style.backgroundColor = 'var(--success-color)';
        accountHeader.innerText = 'Connected Account';
        connectButton.style.display = 'none';
        switchAccountButton.style.display = 'inline-block';
        
       
        copyAddressBtn.onclick = () => copyToClipboard(account);
    } else {
        connectedAccountElement.innerText = 'Not connected';
        copyAddressBtn.style.display = 'none';
        connectionStatus.style.backgroundColor = 'var(--error-color)';
        accountHeader.innerText = 'Not Connected';
        connectButton.style.display = 'inline-block';
        switchAccountButton.style.display = 'none';
    }

   
    document.querySelector('.account-card').style.display = 'block';
    connectionStatus.style.display = 'block';

    
    updateTokenBalance();
}
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Optional: Show a tooltip or notification that the address was copied
        alert('Address copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy address: ', err);
        alert('Failed to copy address. Please try again.');
    });
}

async function updateSKTBalance() {
    const sktBalanceElement = document.getElementById('tokenBalance');
    if (account && contract) {
        try {
            const balance = await contract.methods.balanceOf(account).call();
            sktBalanceElement.innerText = web3.utils.fromWei(balance, 'ether');
        } catch (error) {
            console.error('Error fetching SKT balance:', error);
            sktBalanceElement.innerText = 'Error';
        }
    } else {
        sktBalanceElement.innerText = '0';
    }
}

async function connectToMetaMask() {
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        account = accounts[0];
        skaltuchetContract = new web3.eth.Contract(skaltuchetABI, contractAddress);
        updateUI();
        updateTokenBalance();
        displaySuccess('Connected to MetaMask successfully');
    } catch (error) {
        console.error("Failed to connect to MetaMask:", error);
        displayError('Failed to connect to MetaMask. Please try again.');
    }
}
async function switchAccount() {
    try {
        await window.ethereum.request({
            method: 'wallet_requestPermissions',
            params: [{ eth_accounts: {} }]
        });
        const accounts = await web3.eth.getAccounts();
        account = accounts[0];
        updateUI();
        updateTokenBalance();
    } catch (error) {
        console.error("Failed to switch accounts:", error);
        displayError('Failed to switch accounts. Please try again.');
    }
}
function displayError(message) {
    const statusElement = document.getElementById('status');
    statusElement.innerText = message;
    statusElement.style.color = 'red';
    setTimeout(() => {
        statusElement.style.color = '';
    }, 5000);
}
function displaySuccess(message) {
    const statusElement = document.getElementById('status');
    statusElement.innerText = message;
    statusElement.style.color = 'green';
    setTimeout(() => {
        statusElement.style.color = '';
    }, 5000);
}
function displayWarning(message) {
    const statusElement = document.getElementById('status');
    statusElement.innerText = message;
    statusElement.style.color = 'orange';
    setTimeout(() => {
        statusElement.style.color = '';
    }, 5000);
}

async function swapTokens() {
showLoader();
let ethAmount = document.getElementById('ethAmount').value;
if (ethAmount > 0) {
updateStatus('Processing swap...');
let ethValue = web3.utils.toWei(ethAmount, 'ether');
try {
await skaltuchetContract.methods.buyTokens().send({
from: account,
value: ethValue
});
    
displaySuccess('Tokens swapped successfully!');
updateTokenBalance();
} catch (error) {
console.error("An error occurred during the swap:", error);
displayError(`Error: ${error.message}`);
}
} else {
    displayWarning('please enter a valid amount of ETH to swap');
}
hideLoader();
}

async function updateTokenBalance() {
    const balanceElement = document.getElementById('sktBalance');
    const tokenCard = document.querySelector('.token-card');
    const refreshButton = document.getElementById('refreshBalanceBtn');

    
    refreshButton.disabled = true;
    balanceElement.innerHTML = '<span class="loading">Updating...</span>';

    try {
        const balance = await skaltuchetContract.methods.balanceOf(account).call();
        const formattedBalance = web3.utils.fromWei(balance, 'ether');
        
        // Update the balance with animation
        balanceElement.style.opacity = '0';
        setTimeout(() => {
            balanceElement.innerText = formattedBalance;
            balanceElement.style.opacity = '1';
        }, 200);

        tokenCard.style.display = 'block';
    } catch (error) {
        console.error("Error fetching token balance:", error);
        balanceElement.innerText = 'Error';
        tokenCard.style.display = 'block';
    } finally {
        // Re-enable refresh button
        refreshButton.disabled = false;
    }
}

function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        account = null;
        displayWarning('Please connect to MetaMask');
    } else if (accounts[0] !== account) {
        account = accounts[0];
    }
    updateUI();
}

function updateStatus(message) {
    document.getElementById('status').innerText = message;
}

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});


if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
}

// Form validation
const form = document.querySelector('form');
const inputs = form.querySelectorAll('input');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value) {
            isValid = false;
            input.style.boxShadow = '0 0 0 2px red';
        } else {
            input.style.boxShadow = '';
        }
    });

    if (isValid) {
        console.log('Form submitted successfully');
        swapTokens();
    }
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


function showLoader() {
    document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}
// Add this function for the countdown timer
function startCountdownTimer(endTime) {
    const timerElement = document.getElementById('countdown-timer');
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = endTime - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(timerInterval);
            timerElement.innerHTML = "EXPIRED";
        }
    }

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
}


function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseover', (e) => {
            const tooltipText = e.target.getAttribute('data-tooltip');
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'tooltip';
            tooltipElement.textContent = tooltipText;
            document.body.appendChild(tooltipElement);

            const rect = e.target.getBoundingClientRect();
            tooltipElement.style.left = `${rect.left + window.scrollX}px`;
            tooltipElement.style.top = `${rect.bottom + window.scrollY}px`;
        });

        tooltip.addEventListener('mouseout', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}


function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}







window.addEventListener('load', init);
