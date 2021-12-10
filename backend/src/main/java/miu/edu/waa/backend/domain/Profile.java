package miu.edu.waa.backend.domain;

import lombok.Getter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "user_profile")
@Getter
public class Profile {

    private String username;
    @Column(name = "image_url")
    private String imageUrl;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;


    @OneToMany(mappedBy = "to")
    private List<Follow> followers;

    @OneToMany(mappedBy = "from")
    private List<Follow> following;

    @OneToOne(mappedBy = "profile")
    private User user;

    public Profile() {
    }

    public Profile(String username) {
        this.username = username;
    }

}
