import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-database'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCHxRrIh_ird6JeDRaKU_7bm2EzK9bsY3s",
    authDomain: "kotalishious-dff22.firebaseapp.com",
    databaseURL: "https://kotalishious-dff22.firebaseio.com",
    projectId: "kotalishious-dff22",
    storageBucket: "kotalishious-dff22.appspot.com",
    messagingSenderId: "180338444173",
    appId: "1:180338444173:web:708494a4359e5bc639dfc4"
};


class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig)
        this.auth = app.auth()
        this.db = app.database()
        this.storageRef = app.storage()
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    logout() {
        return this.auth.signOut()
    }

    async register(name, email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password)
        return this.auth.currentUser.updateProfile({
            displayName: name
        })
    }

    addHouse(name, plotN0, city, phone, email, url) {
        if (!this.auth.currentUser) {
            return alert('Not authorized')
        }
        let user;
        user = app.auth().currentUser;

        return this.db.ref('guesthouses').child("House Details").push({
            houseId: user.uid,
            name: name,
            plotN0: plotN0,
            city: city,
            phone: phone,
            email: email,
            imageUrl:url,
        }).catch((error) => {
            alert(error.message);
        })

    }

    //adding a room type
    addRoomType(typeName, maxPerson, price, hasSingleUse) {
        if (!this.auth.currentUser) {
            return alert('Not authorized')
        }

        let user;
        user = app.auth().currentUser;
        return this.db.ref('guesthouses').child("Rooms Details").child("RoomTypes").push({
            houseId: user.uid,
            typeName: typeName,
            maxPerson: maxPerson,
            price: price,
            hasSingleUse: hasSingleUse,
        }).catch((error) => {
            alert(error.message);
        })
    }

    //adding a room
    addRooms(roomType, roomNo) {
        if (!this.auth.currentUser) {
            return alert('Not authorized')
        }

        let user;
        user = app.auth().currentUser;
        return this.db.ref('guesthouses').child("Rooms Details").child("Rooms").push({
            houseId: user.uid,
            roomType: roomType,
            roomNo: "Room " + roomNo,
            roomStatus: 1,
        }).catch((error) => {
            alert(error.message);
        })
    }

    //getting room type
    allRoomTypes() {
        let newRoomType = [];
        let roomTypeColle = [];
        var starCountRef = app.database().ref('guesthouses').child("Rooms Details").child("RoomTypes");
        starCountRef.on('value', (snapshot) => {
            snapshot.forEach(data => {
                const dataVal = data.val()
                newRoomType.push({
                    typeName: dataVal.typeName,
                    maxPerson: dataVal.maxPerson,
                    price: dataVal.price,
                    hasSingleUse: dataVal.hasSingleUse,
                })

                roomTypeColle.push(newRoomType);
            })

            return roomTypeColle;
            console.log(roomTypeColle);

        });
    }

    isInitialized() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }

    getCurrentUsername() {
        return this.auth.currentUser && this.auth.currentUser.displayName
    }

    getCurrentUserId() {
        let user;
        user = app.auth().currentUser;

        console.log(user.uid);
        return user.uid;
    }

    async addImages(fileNames) {
        let user;
        user = app.auth().currentUser;
        let allImages = [];

        allImages = fileNames;

        allImages.forEach(file => {
            return this.db.ref('guesthouses').child("Rooms Details").child("Rooms").child("images").push({
                houseId: user.uid,
                imgUrl: file.fireBaseUrl,
                fileName: file.name
            }).catch((error) => {
                alert(error.message);
            })
        })
    }
}

export default new Firebase()