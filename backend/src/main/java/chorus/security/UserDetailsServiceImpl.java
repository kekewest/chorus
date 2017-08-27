package chorus.security;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import chorus.repository.security.UserRepository;

public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        chorus.domain.db.node.security.User userEntity = userRepository.findByName(username);

        if (userEntity == null) {
            throw new UsernameNotFoundException("user not found.");
        }

        User user = new User(userEntity.getName(), userEntity.getPassword(), getAuthorities(userEntity));
        return user;
    }

    private Collection<? extends GrantedAuthority> getAuthorities(chorus.domain.db.node.security.User userEntity) {
        Set<GrantedAuthority> authorities = new HashSet<>();
        userEntity.getAuthorities().forEach(
                (authority) -> {
                    authorities.add(new SimpleGrantedAuthority(authority.getAuthorityType().toString()));
                });
        return authorities;
    }

}
