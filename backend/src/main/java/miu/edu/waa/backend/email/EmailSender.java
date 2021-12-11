package miu.edu.waa.backend.email;

public interface EmailSender {
    void send(String to, String email);
}
