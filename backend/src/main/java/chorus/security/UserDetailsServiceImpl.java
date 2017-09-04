package chorus.security;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import chorus.domain.db.entity.security.User;
import chorus.repository.security.UserRepository;

public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User userEntity = userRepository.findOne(username);

        if (userEntity == null) {
            throw new UsernameNotFoundException("user not found.");
        }

        org.springframework.security.core.userdetails.User user = new org.springframework.security.core.userdetails.User(
                userEntity.getName(),
                userEntity.getPassword(),
                getAuthorities(userEntity));

        return user;
    }

    private Collection<? extends GrantedAuthority> getAuthorities(User userEntity) {
        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority(userEntity.getAuthority().toString()));
        return authorities;
    }

}
