<template>
    <div class="admin-container">
        <div class="header">
            <h1>Welcome to Admin Page</h1>
            <button class="logout-button" @click="logout">Logout</button>
        </div>

        <div class="admin-dashboard">
            <h2>Admin Dashboard</h2>

            <section>
                <h3>Add User</h3>
                <input v-model="newUser.name" placeholder="Name" class="input-field" />
                <input v-model="newUser.studentId" placeholder="Student ID" class="input-field" />
                <input v-model="newUser.email" placeholder="Email" class="input-field" />
                <button @click="addUser" class="action-button">Add User</button>
            </section>

            <section>
                <h3>Delete User</h3>
                <input v-model="deleteUserId" placeholder="Student ID" class="input-field" />
                <button @click="deleteUser" class="action-button">Delete User</button>
            </section>

            <section>
                <h3>Add Gift</h3>
                <input v-model="newGift.title" placeholder="Gift Title" class="input-field" />
                <input v-model="newGift.name" placeholder="Gift Name" class="input-field" />
                <input v-model="newGift.count" type="number" placeholder="Gift Count" class="input-field" />
                <button @click="addGift" class="action-button">Add Gift</button>
            </section>

            <section>
                <h3>Update Gift Count</h3>
                <input v-model="giftId" placeholder="Gift ID" class="input-field" />
                <input v-model="newGiftCount" type="number" placeholder="New Gift Count" class="input-field" />
                <button @click="updateGiftCount" class="action-button">Update Gift Count</button>
            </section>

            <section>
                <h3>Gift List</h3>
                <button @click="getGiftList" class="action-button">Get Gift List</button>
                <ul class="gift-list">
                    <li v-for="gift in gifts" :key="gift._id">
                        {{ gift.title }} - {{ gift.name }}: {{ gift.count }}
                    </li>
                </ul>
            </section>

            <section>
                <h3>User Lottery Records</h3>
                <input v-model="userLotteryId" placeholder="Student ID" class="input-field" />
                <button @click="getUserLotteryRecords" class="action-button">Get Lottery Records</button>
                <ul class="record-list">
                    <li v-for="record in userRecords" :key="record.drawDate">
                        {{ record.giftTitle }} ({{ record.giftName }}) - {{ record.drawDate }}
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: "AdminDashBoard",
    data() {
        return {
            newUser: {
                name: '',
                studentId: '',
                email: '',
            },
            deleteUserId: '',
            newGift: {
                title: '',
                name: '',
                count: 0,
            },
            giftId: '',
            newGiftCount: 0,
            gifts: [],
            userLotteryId: '',
            userRecords: [],
        };
    },
    methods: {
        logout() {
            localStorage.removeItem('isAuthenticated');
            this.$router.push('/login');
        },
        async addUser() {
            try {
                const response = await fetch('/addUser', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.newUser),
                });
                if (response.ok) {
                    alert('User added successfully');
                    this.newUser = { name: '', studentId: '', email: '' };
                } else {
                    alert('Error adding user');
                }
            } catch (error) {
                alert('Error adding user');
            }
        },
        async deleteUser() {
            try {
                const response = await fetch('/deleteUser', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ studentId: this.deleteUserId }),
                });
                if (response.ok) {
                    alert('User deleted successfully');
                    this.deleteUserId = '';
                } else {
                    alert('Error deleting user');
                }
            } catch (error) {
                alert('Error deleting user');
            }
        },
        async addGift() {
            try {
                const response = await fetch('/addGift', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.newGift),
                });
                if (response.ok) {
                    alert('Gift added successfully');
                    this.newGift = { title: '', name: '', count: 0 };
                } else {
                    alert('Error adding gift');
                }
            } catch (error) {
                alert('Error adding gift');
            }
        },
        async updateGiftCount() {
            try {
                const response = await fetch('/updateGiftCount', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ giftId: this.giftId, newCount: this.newGiftCount }),
                });
                if (response.ok) {
                    alert('Gift count updated successfully');
                    this.giftId = '';
                    this.newGiftCount = 0;
                } else {
                    alert('Error updating gift count');
                }
            } catch (error) {
                alert('Error updating gift count');
            }
        },
        async getGiftList() {
            try {
                const response = await fetch('/getGifts');
                if (response.ok) {
                    this.gifts = await response.json();
                } else {
                    alert('Error fetching gift list');
                }
            } catch (error) {
                alert('Error fetching gift list');
            }
        },
        async getUserLotteryRecords() {
            try {
                const response = await fetch(`/check/${this.userLotteryId}`);
                if (response.ok) {
                    const data = await response.json();
                    this.userRecords = data.gifts;
                } else {
                    alert('Error fetching user lottery records');
                }
            } catch (error) {
                alert('Error fetching user lottery records');
            }
        },
    },
};
</script>

<style scoped>
/* 基本样式重置 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* 管理员页面容器 */
.admin-container {
    padding: 20px;
    background-color: #f0f2f5;
    min-height: 100vh;
}

/* 页面顶部区域 */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

h1 {
    color: #333;
    font-size: 2rem;
}

/* 登出按钮 */
.logout-button {
    padding: 10px 20px;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.logout-button:hover {
    background-color: #c0392b;
}

/* 管理页面区域 */
.admin-dashboard {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 标题 */
h2 {
    color: #333;
    font-size: 1.8rem;
    margin-bottom: 20px;
}

h3 {
    color: #555;
    margin: 20px 0 10px;
}

/* 输入框 */
.input-field {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s;
}

.input-field:focus {
    border-color: #007bff;
}

/* 按钮样式 */
.action-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-bottom: 20px;
}

.action-button:hover {
    background-color: #0056b3;
}

/* 列表样式 */
.gift-list,
.record-list {
    list-style-type: none;
    margin-top: 10px;
    padding: 0;
}

.gift-list li,
.record-list li {
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>