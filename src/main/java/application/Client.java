package application;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.Objects;

@Entity
@Table(name = "client")
public class Client
{

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String email;

    protected Client()
    {

    }

    public Client(final String name, final String email)
    {
        this.name = name;
        this.email = email;
    }

    public Long getId()
    {
        return id;
    }

    public void setId(final Long id)
    {
        this.id = id;
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(final String email)
    {
        this.email = email;
    }

    public String getName()
    {
        return name;
    }

    public void setName(final String name)
    {
        this.name = name;
    }

    @Override
    public boolean equals(final Object o)
    {
        if (this == o)
        {
            return true;
        }
        if (o == null || getClass() != o.getClass())
        {
            return false;
        }
        final Client client = (Client) o;
        return Objects.equals(id, client.id) && Objects.equals(name,
                                                               client.name) && Objects.equals(
                email,
                client.email);
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(id, name, email);
    }

    @Override
    public String toString()
    {
        return "Client{" + "id=" + this.id + ", name='" + this.name + '\'' + ", email=" + this.email + '}';
    }
}