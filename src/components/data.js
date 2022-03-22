import { HomeOutlined, BulbOutlined, FundOutlined } from '@ant-design/icons';

export const NavbarData = [{
        title: "Home",
        path: "/",
        icon: < HomeOutlined / > ,

    },
    {
        title: "Cryptocurrencies",
        path: "/cryptocurrencies",
        icon: < FundOutlined / > ,

    },
    {
        title: "News",
        path: "/news",
        icon: < BulbOutlined / > ,

    }
];

export const coin = [{
        name: "Bitcoin"
    },
    {
        name: "Ethereum"
    },
    {
        name: "Tether"
    },
    {
        name: "BNB"
    },
    {
        name: "USD Coin"
    },
    {
        name: "XRP"
    },
    {
        name: "Terra"
    },
    {
        name: "Solana"
    },
    {
        name: "Cardano"
    },
    {
        name: "Palkadot"
    },
];

export const chartDays = [{
        label: "24 Hours",
        value: 1,
    },
    {
        label: "30 Days",
        value: 30,
    },
    {
        label: "3 Months",
        value: 90,
    },
    {
        label: "1 Year",
        value: 365,
    },
];