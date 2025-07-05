 // to fix open/closed principle
 //In the original code if we want to add any notification type we should modify the send function which violates this principle. 
// let each notifier extends this base so any additional notifier can be added with its own message without affecting others
// so adding new notification type do not require modifying existing code;
 class Notifier {
  send(message) {
    throw new Error("send() must be implemented by subclass");
  }
}
//single responsibility Principle fixing
//the original code has many tasks like identifying validating notification types, also sending messages which violates SRP. 
//separate each task into its own class;  
class EmailNotification extends Notifier{
    constructor(email){
        super();
        this.email=email;
    }
    send(message){
        console.log(`sending email to ${this.email}: ${message}`);
    }
}
class SmsNotification extends Notifier{
    constructor(phoneNumber){
        super();
        this.phoneNumber=phoneNumber;
    }
    send(message){
        console.log(`sending sms to ${this.phoneNumber}: ${message}`)
    }
}
class TelegramNotification extends Notifier{
    constructor(tgUserName){
        super();
        this.tgUserName=tgUserName;
    }
    send(message){
        console.log(`sending telegram to ${this.tgUserName}: ${message}`)
    }
}
// now, lets fix Liskov Substitution principle
//as the principle stated as, if a base class has a method, anysubclass should be able to be used in its place.
//in the original code how we use .send() changes based on the subtype we are using. but according to LSP, we should treat all the subtypes the same. 
// so our original code don't have substitution behavior.
// to fix that by making the class to inherit the notifier base class they will all have the same.send() signature, and don't have to remember which argument to provide or what null to put.

// Now lets fix interface segregation principle(ISP)
//our original method forces send(message, emailAddress, phoneNumber, telegramId) forces the user to provide all possible parameters even though only one is needed.
//we have already fixed it as now each class accepts only what it needs in the constructor and no unnecessary parameters passed or exposed.
// To fix Dependency Inversion Principle(DIP) which stated High-level modules should not depend on low-level modules. 
//Both should depend on abstractions. 
//in our code the high level part should not know or care which specific thing its using. it should work through a common interface or abstract class.
// in our original code, the concrete Notification class decides how and what to send by checking notification type which violates DIP as high-level code dependent on the implementation or low level details.
//to fix this, we make our high-level logic like NotificationService depend only on abstraction or base class, not on the low level class like EmailNotification.


class NotificationService {
  constructor(notifier) {
    this.notifier = notifier;
  }

  notify(message) {
    this.notifier.send(message); 
  }
}
//now we can inject any notifier from outside.
const emailNotifier = new EmailNotification("a@email.com");
const smsNotifier = new SmsNotification("1234567890");

const service1 = new NotificationService(emailNotifier);
const service2 = new NotificationService(smsNotifier);

service1.notify("Hello via Email");
service2.notify("Hello via SMS");