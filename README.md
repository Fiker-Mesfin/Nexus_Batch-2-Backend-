# Nexus_Batch-2-Backend-
For finished tasks given by Nexus tutorial.


1. Single Responsibility Principle (SRP)
Initially, the Notification class performed multiple tasks: determining notification type, validating input data, and sending messages. This violates SRP because a class should have only one responsibility or reason to change. To fix it I separated these concerns by creating dedicated classes for each notification type — Email, SMS, and Telegram. Each class is responsible solely for sending messages related to its notification type, eliminating the mixed responsibilities.

3. Open/Closed Principle (OCP)
In the original code, adding support for a new notification type required modifying the existing send method with additional conditionals. This violates OCP, which states that software entities should be open for extension but closed for modification. To fit this,  I introduced an abstract base class (Notifier) defining a common interface for sending messages. Each notification type class extends this base class and implements its own sending logic. This design allows adding new notification types simply by creating new classes without changing existing code.

4. Liskov Substitution Principle (LSP)
Originally, the send method’s required parameters varied depending on the notification type. This inconsistency prevented objects of different notification types from being used interchangeably without additional handling or remembering specific argument rules, violating LSP. To Fix it,  I standardized the interface so that all notifier classes implement the same send(message) method signature. This allows any notifier subclass to be substituted wherever the base class is expected, enabling polymorphism and simplifying usage.

5. Interface Segregation Principle (ISP)
The original Notification class’s send method forced clients to provide all possible parameters (email, phone number, telegram ID) even though only one was relevant for a particular notification type. This bloated the interface and imposed unnecessary requirements on clients. After fixing Each notification class now receives only the necessary data via its constructor, and the send method accepts only the message text. This design keeps interfaces minimal and focused, preventing clients from being burdened with irrelevant parameters.

6. Dependency Inversion Principle (DIP)
The original design had high-level modules (e.g., notification logic) depend directly on low-level concrete implementations with conditional logic to decide how to send notifications. This violates DIP, which advocates depending on abstractions rather than concrete implementations. To fix this, I introduced a NotificationService class that depends only on the Notifier abstraction. Specific notifier instances are injected into this service, allowing the high-level logic to remain agnostic to the concrete notification types. This decouples modules and makes the system more flexible and testable.



