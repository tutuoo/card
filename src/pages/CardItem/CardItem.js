import React from 'react'
import './CardItem.css'

function CardItem(props) {
    const { userInfo } = props;
    const { label, web2, want, flag, web3, avatar, uname, city, web3age } = userInfo;
    return (
        <div className='cardItem'>
            <div className='intros'>
                <div className='name2city'>
                    {
                        avatar && (
                            <img src={avatar} alt="" className='avatar' />
                        )
                    }
                    <div>
                        <div className='name2cityItem'>
                            <span className='key'>NAME / </span>
                            <span className='val'>{uname}</span>
                        </div>
                        <div className='name2cityItem'>
                            <span className='key'>CITY / </span>
                            <span className='val'>{city}</span>
                        </div>
                        <div className='name2cityItem'>
                            <span className='key'>WEB3 AGE / </span>

                            <span className='val'>{web3age}</span>
                        </div>
                    </div>
                </div>
                <div className='introItem'>
                    <div className='title'>【个人标签】</div>
                    <div className='introContent'>{label}</div>
                </div>
                <div className='introItem'>
                    <div className='title'>【职业技能】</div>
                    <div className='introContent'>{web2}</div>
                </div>
                <div className='introItem'>
                    <div className='title'>【我的需求】</div>
                    <div className='introContent'>{want}</div>
                </div>
                <div className='introItem'>
                    <div className='title'>【个人经历和成就】</div>
                    <div className='introContent'>{flag}</div>
                </div>
                {/* <div className='introItem'>
                    <div className='title'>【WEB3行业看法】</div>
                    <div className='introContent'>{web3}</div>
                </div> */}
            </div>
        </div>
    )
}

export default CardItem