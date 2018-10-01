module.exports = {
  address: "0x323919c6dF517765070f4b75Bb886B5Edb927bF4",
  abi: [
    {
      constant: true,
      inputs: [
        {
          name: "",
          type: "uint256"
        },
        {
          name: "",
          type: "uint256"
        }
      ],
      name: "AssetToHourToPrice",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      constant: false,
      inputs: [
        {
          name: "_stockName",
          type: "uint256"
        },
        {
          name: "_timeslot",
          type: "uint256"
        },
        {
          name: "_price",
          type: "uint256"
        }
      ],
      name: "setPrice",
      outputs: [
        {
          name: "res",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "_stockName",
          type: "uint256"
        },
        {
          name: "_timeslot",
          type: "uint256"
        }
      ],
      name: "getPrice",
      outputs: [
        {
          name: "res",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    }
  ]
};