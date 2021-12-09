package miu.edu.waa.backend.domain;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Table(name="follow_follower_table")
@Getter
public class Follow {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name="from_user_fk")
    private Profile from;

    @ManyToOne
    @JoinColumn(name="to_user_fk")
    private Profile to;

    public Follow() {};

    public Follow(Profile from, Profile to) {
        this.from = from;
        this.to = to;
    }
}
