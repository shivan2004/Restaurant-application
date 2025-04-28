# Restaurant Management System

This is a **full-stack web application** designed for **restaurant management**. It enables real-time order placement, menu management, and role-specific access for **Admin**, **Kitchen**, and **Customer** roles. The application aims to streamline restaurant operations, improve communication between kitchen staff and customers, and simplify order management.

### Hosted Application:
You can access the live application here:  
[Restaurant Application Demo](https://shivan-restaurant-application.netlify.app/)

---

## **Features**

### **Admin Features**:
- **View Menu**: View and manage the full menu.
- **Add Menu Item**: Add new menu items to the restaurant's offerings.
- **Live Orders**: Monitor live orders in real-time.
- **Completed Orders**: Track completed orders.
- **Ratings/Reviews**: View customer ratings and reviews.

### **Kitchen Features**:
- **Live Orders**: View all incoming live orders.
- **Order Completion**: Mark orders as completed once prepared.

### **Customer Features**:
- **View Menu**: View available menu items.
- **Place Order**: Select and order items from the menu.
- **Live Order Tracking**: View the status of your orders in real-time.
- **Ratings/Reviews**: Submit ratings and reviews for items.

---

## **Screenshots**

Here are a few screenshots showcasing different parts of the application (optimized for smaller size):

- **Register Screen**  
  ![Register](./images/register-small.png)

- **Login Screen**  
  ![Login](./images/login-small.png)

- **Menu Management (Admin)**  
  ![Menu Management](./images/menu-management-small.png)

- **Live Orders (Kitchen)**  
  ![Live Orders](./images/live-orders-small.png)

- **Completed Orders (Admin)**  
  ![Completed Orders](./images/completed-orders-small.png)

- **Customer Reviews**  
  ![Customer Reviews](./images/customer-reviews-small.png)

> **Note**: All images are resized for quick loading and concise presentation.

---

## **Technologies Used**

- **Frontend**: ReactJS
- **Backend**: Spring Boot
- **Database**: MySQL
- **Authentication**: JWT, Spring Security

---

## **Setup**

To run this project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/restaurant-application.git
    ```

2. Navigate to the frontend directory:
    ```bash
    cd frontend
    npm install
    npm start
    ```

3. Navigate to the backend directory:
    ```bash
    cd backend
    mvn clean install
    mvn spring-boot:run
    ```

4. **Important**: After starting the backend server, it may take a few minutes to fully initialize. Please **allow some time for the backend to start**. If the frontend doesn't load or you encounter issues, try restarting the backend server.

5. Open `http://localhost:3000` for the frontend and `http://localhost:8080` for the backend.

---

## **Contributing**

Feel free to fork this project, submit pull requests, or file issues for any bugs or feature requests.

---

## **License**

This project is licensed under the MIT License.
