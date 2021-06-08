import React, { useState } from "react";
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const Feedback = () => {

    const { siteConfig } = useDocusaurusContext();
    const openAnIssue = siteConfig?.customFields?.externalLinks?.openAnIssue;
    const kubernetesSlackOpenEBS = siteConfig?.customFields?.externalLinks?.kubernetesSlackOpenEBS;
    const [isThanksTextVisible, setThanksTextVisibility] = useState(false); 
    
    const handleResponse = (action, value) => {
        setThanksTextVisibility(true);
        sendFeedback(action,value);
    }

    function sendFeedback(action,value) {
        if(typeof window !== undefined) {
            if(!window?.gtag) { 
                return null;
            }
            window?.gtag('event', action, {
                'event_category': 'Docs:Helpful',
                'event_label': window.location.href,
                'value': value
            });
        }
    }

    return(
        <div className={styles.wrapper}>
            <h4>Was this page helpful? We appreciate your feedback</h4>
            <div className={styles.buttonGroup}>
                <button type="button" className="doc-button doc-button-primary doc-button-curved" onClick={() => handleResponse("Yes", 1)} disabled={isThanksTextVisible}>Yes</button>
                <button type="button" className="doc-button doc-button-outlined doc-button-curved" onClick={() => handleResponse("No", 0)} disabled={isThanksTextVisible}>No</button>
            </div>
            {
                isThanksTextVisible && (
                    <p id="feedback-response" className={`${styles.feedbackResponseHidden} ${isThanksTextVisible && styles.feedbackResponseVisible}`}>Thanks for the feedback. Open an issue in the <a href={openAnIssue} target="_blank" rel="noopener">GitHub repo</a> if you want to report a problem or suggest an improvement. Engage and get additional help on <a href={kubernetesSlackOpenEBS} target="_blank" rel="noopener">{kubernetesSlackOpenEBS}</a>.</p>
                )
            }
           
        </div>
    )
}