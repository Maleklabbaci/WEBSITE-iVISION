import React from 'react';

const TrainingCenterLanding = () => {
    return (
        <div>
            <h1>Welcome to Our Training Center</h1>
            <h2>Pricing Plans</h2>
            <ul>
                <li>
                    <h3>Basic Plan</h3>
                    <p>Price: $100</p>
                </li>
                <li>
                    <h3>Standard Plan</h3>
                    <p>Price: $200</p>
                </li>
                <li>
                    <h3>Premium Plan</h3>
                    <p>Price: $300</p>
                </li>
            </ul>
            <h2>Register Now</h2>
            <form>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default TrainingCenterLanding;