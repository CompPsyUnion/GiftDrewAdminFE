<template>
    <div>
        <h1>Welcome to Admin Page</h1>
        <button @click="logout">Logout</button>
    </div>
    <div>
        <h2>Admin Dashboard</h2>

        <h3>Add User</h3>
        <input v-model="newUser.name" placeholder="Name" />
        <input v-model="newUser.studentId" placeholder="Student ID" />
        <input v-model="newUser.email" placeholder="Email" />
        <button @click="addUser">Add User</button>

        <h3>Delete User</h3>
        <input v-model="deleteUserId" placeholder="Student ID" />
        <button @click="deleteUser">Delete User</button>

        <h3>Add Gift</h3>
        <input v-model="newGift.title" placeholder="Gift Title" />
        <input v-model="newGift.name" placeholder="Gift Name" />
        <input v-model="newGift.count" placeholder="Gift Count" />
        <button @click="addGift">Add Gift</button>

        <h3>Update Gift Count</h3>
        <input v-model="giftId" placeholder="Gift ID" />
        <input v-model="newGiftCount" placeholder="New Gift Count" />
        <button @click="updateGiftCount">Update Gift Count</button>

        <h3>Gift List</h3>
        <button @click="getGiftList">Get Gift List</button>
        <ul>
            <li v-for="gift in gifts" :key="gift._id">
                {{ gift.title }} - {{ gift.name }}: {{ gift.count }}
            </li>
        </ul>

        <h3>User Lottery Records</h3>
        <input v-model="userLotteryId" placeholder="Student ID" />
        <button @click="getUserLotteryRecords">Get Lottery Records</button>
        <ul>
            <li v-for="record in userRecords" :key="record.drawDate">
                {{ record.giftTitle }} ({{ record.giftName }}) - {{ record.drawDate }}
            </li>
        </ul>
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
            localStorage.removeItem('isAuthenticated');  // 清除认证状态
            this.$router.push('/login');  // 重定向到登录页
        },
        async addUser() {
            try {
                const response = await fetch('/addUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.newUser),
                });
                if (response.ok) {
                    alert('User added successfully');
                    this.newUser = { name: '', studentId: '', email: '' };
                } else {
                    alert('Error adding user');
                }
            } catch (error) {
                console.error(error);
                alert('Error adding user');
            }
        },
        async deleteUser() {
            try {
                const response = await fetch('/deleteUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ studentId: this.deleteUserId }),
                });
                if (response.ok) {
                    alert('User deleted successfully');
                    this.deleteUserId = '';
                } else {
                    alert('Error deleting user');
                }
            } catch (error) {
                console.error(error);
                alert('Error deleting user');
            }
        },
        async addGift() {
            try {
                const response = await fetch('/addGift', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.newGift),
                });
                if (response.ok) {
                    alert('Gift added successfully');
                    this.newGift = { title: '', name: '', count: 0 };
                } else {
                    alert('Error adding gift');
                }
            } catch (error) {
                console.error(error);
                alert('Error adding gift');
            }
        },
        async updateGiftCount() {
            try {
                const response = await fetch('/updateGiftCount', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
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
                console.error(error);
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
                console.error(error);
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
                console.error(error);
                alert('Error fetching user lottery records');
            }
        },
    },
};
</script>

<style scoped>
/* Add your styles */
</style>