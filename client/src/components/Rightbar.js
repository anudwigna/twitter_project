import React from 'react';
import './Rightbar.css';
import hardhat from '../images/hardhat.jpg';
import solidity from '../images/solidity.jpg';
import metamask from '../images/metamask.jpg';
import javascript from '../images/javascript.jpg';
import { Input } from '@web3uikit/core';
import { Search } from '@web3uikit/icons';


const Rightbar = () =>{
    const trends = [
        {
            img:hardhat,
            text: "Hardhat",
            link: "https://hardhat.org/",
        },
        {
            img:solidity,
            text: "Solidity",
            link: "https://soliditylang.org/",
        },
        {
            img:javascript,
            text: "JavaScript",
            link: "https://www.javascript.com/",
        },
        {
            img:metamask,
            text: "MetaMask",
            link: "https://metamask.io/",
        },
    ];

    return (
        <>
        <div className='rightbarContent'>
        <Input label='Search Trending' name='Search Twitter' prefixIcon={<Search/>} labelBgColor="#141d26"></Input>
        <div className='trends'>Trends for you
            {
                trends.map((e)=>{
                    return (
                        <>
                          <div className='trend' onClick={()=>window.open(e.link)}>
                              <img src={e.img} className='trendImg'></img>
                              <div className='trendText'>{e.text}</div>
                          </div>
                        </>
                    );
                })
            }
        </div>
        </div>
        </>
    );
}

export default Rightbar;