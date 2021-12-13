package miu.edu.waa.backend.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "USER_PROFILE")
public class Profile {
    @Id
    @GeneratedValue
    private long id;
    private String imageUrl;

//    @OneToMany(mappedBy = "to")
//    private List<Follow> followers;
//
//    @OneToMany(mappedBy = "from")
//    private List<Follow> following;

    @OneToOne(mappedBy = "profile")
    private User user;
}
