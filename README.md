
# Creator Analytics

Creator Analytics is a fullstack web application that aims to assist Instagram Business and Creator accounts with tracking their insights over long periods of time. As I personally run a small Creator account on Instagram to share my artwork, I wanted to build something that would help me easily keep track of my account statistics and growth over time in order to see any overall trends.

The tech stack I'm working with for this project currently consists of React.js (JavaScript), Spring Boot (Java), and SQLite. I'm using this as an opportunity to boost my knowledge of the Spring Boot framework, SQL, as well as the backend in general.

Creator Analytics is currently unfinished, but I plan on chipping away at it bit by bit over the upcoming fall quarter. Thanks for stopping by to take a look!


## Mockups

Below are some rough mockups for what I hope the finished product will look similar to.

### Signed Out View
<img src="https://i.imgur.com/iKJ9gn3.png" width=600px/>

### Signed In View
<img src="https://i.imgur.com/TEzLg2Q.png" width=600px/>


## Features

### Currently Implemented
| Feature | Explanation |
| ----------- | ----------- |
| Facebook Login | Users can log in via Facebook, and Creator Analytics will determine whether they currently have administrative access to any Facebook pages that have an attached Instagram Business or Creator account. |

### Upcoming
| Feature | Explanation |
| ----------- | ----------- |
| Facebook Page Selection | Users will be able to select the Facebook page connected to their desired Instagram account. |
| Account Switch | Users will be able to switch to a different Facebook page/Instagram account without signing out of Facebook. |
| Current Statistics | Creator Analytics will be able to retrieve the account's most recent insight information, and display it in a basic way. |
| Current Posts/Stories | Posts and stories from the past seven days will be displayed alongside various statistics and information |

### Planned
| Feature | Explanation |
| ----------- | ----------- |
| Database | SQLite database implementation to store insight history. |
| Insight Graphs | Integration of the react-vis library in order to display stored information in a visually pleasing manner. |
| Color Themes | Additional color themes will be added to the site in order to make it visually pleasing for any user. |
