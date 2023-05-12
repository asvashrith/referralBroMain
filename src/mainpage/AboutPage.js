import React, {  useEffect,useState } from 'react';
import { createBootstrapComponent } from 'react-bootstrap/esm/ThemeProvider';
import Mainpage from '../authentication/main';
import '../Css/aboutPage.css';
import { firebase, auth, storage } from '../firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import CanReferImg from '../Assets/needReferral.jpeg';
import NeedReferralImg from '../Assets/resumeBlue.png';
import studentsImgs from '../Assets/graduateBlue.png';



const AboutPage = () =>{
    const [activeCard, setActiveCard] = useState(null);
    const [usersData, setusersData] = useState('');

    const userUniqueId = auth.currentUser.uid;
    const db = firebase.firestore();
    const [isLoading, setisLoading] = useState(true);
    const description = 'Here, you can refer friends and colleagues for job opportunities or get referred yourself. Whether youre a seasoned professional or a young talent, our platform is your one-stop destination to connect with industry insiders. Say goodbye to endless job applications and impersonal processes.';
//  Through referrals, you can unlock exciting career prospects and tap into the power of connections
    useEffect(async () => {

        try {
            const docRef = doc(db, "userData", userUniqueId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setusersData(docSnap.data().myname);
                console.log(docSnap.data().myname);
                setisLoading(false)
            } else {
                console.log("Document does not exist")
            }
        } catch (error) {
            console.log(error)
        }

    });


    const cards = [
        {
          title: 'Need Referral',
          description: 'Unlock the power of referrals from Bros! Visit this section and submit your details to get referred.',
          img: CanReferImg,
          isExpandable: true,
        },
        {
          title: 'Can Refer',
          description: 'Become a bro for Referral-Bro! Join our platform and share your work email to receive resumes directly in your inbox for which you can provide referral.',
          img: NeedReferralImg,
          isExpandable: true,
        },
        {
          title: 'Student',
          description: 'Recent graduate looking to kickstart your career in a cool company? Explore list of exciting job openings & find the perfect opportunity to begin your career path!',
          img: studentsImgs,
          isExpandable: true,
        },
      ];
    
      const handleCardClick = index => {
        setActiveCard(index);
      };
    
      const handleCardLeave = () => {
        setActiveCard(null);
      };




    return (
      <div class="sectionContainer">
        <div class = "about-page-content">
          <div class="welcome-tag">Welcome, {usersData} </div>
          <br></br>
          <div class="aboutpage-descp">{description}</div>
          <br></br>

          <div className="cards-container">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`card ${activeCard === index ? 'active' : ''} ${card.isExpandable ? 'expandable' : ''}`}
                onClick={() => handleCardClick(index)}
                onMouseLeave={() => handleCardLeave()}
              >
                <div className="card-image">
                  <img src={card.img} alt={card.title} />
                </div>
                <div className="card-content">
                  <h2>{card.title}</h2>
                  <p>{card.description}</p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
    );
}
export default AboutPage;
