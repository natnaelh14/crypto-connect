import { gql } from "@apollo/client";

export const UPDATE_USER_PROFILE = gql`
  mutation updateProfile(
    $id: ID!
    $email: String!
    $handle: String!
    $avatar: String
    $gender: Gender
    $birth_date: Date
    $bio: String
    $city: String
    $state: String
    $country: String
    $status: MoodStatus
    $isActive: Boolean!
  ) {
    updateUserProfile(
      id: $id
      email: $email
      handle: $handle
      avatar: $avatar
      gender: $gender
      birth_date: $birth_date
      bio: $bio
      city: $city
      state: $state
      country: $country
      status: $status
      isActive: $isActive
    ) {
      id
      email
      handle
      avatar
      gender
      birth_date
      bio
      city
      state
      country
      status
      isActive
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($user_id: ID!, $text: String!) {
    addPost(user_id: $user_id, text: $text) {
      id
      text
      user_id
      created_at
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePostMutation($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addPostMutation($text: String!, $user_id: ID!, $post_id: ID!) {
    addComment(user_id: $user_id, post_id: $post_id, text: $text) {
      id
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deletePostMutation($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`;

export const ADD_CRYPTO = gql`
  mutation addCryptoMutation(
    $cryptoName: String!
    $holdingAmount: Int!
    $userId: ID!
  ) {
    addCrypto(
      crypto_name: $cryptoName
      holding_amount: $holdingAmount
      user_id: $userId
    ) {
      id
      user_id
      crypto_name
      holding_amount
      purchase_date
    }
  }
`;

export const UPDATE_CRYPTO = gql`
  mutation updateCryptoMutation($holding_amount: Int!, $id: ID!) {
    updateCrypto(holding_amount: $holding_amount, id: $id) {
      id
      user_id
      crypto_name
      holding_amount
      purchase_date
    }
  }
`;

export const DELETE_CRYPTO = gql`
  mutation deleteCryptoMutation($id: ID!) {
    deleteCrypto(id: $id) {
      id
    }
  }
`;
export const FRIEND_REQUEST = gql`
  mutation followRequestMutation(
    $sender_id: String!
    $receiver_id: String!
  ) {
    followRequest(
      sender_id: $sender_id
      receiver_id: $receiver_id
    ) {
      id
      sender_id
      receiver_id
      status
    }
  }
`;

export const UPDATE_FRIEND_REQUEST = gql`
  mutation RespondFollowRequestMutation(
    $sender_id: String!
    $receiver_id: String!
    $status: Status!
  ) {
    respondFollowRequest(
      sender_id: $sender_id
      receiver_id: $receiver_id
      status: $status
    ) {
      id
      sender_id
      receiver_id
      status
    }
  }
`;

export const REMOVE_FOLLOWING = gql`
  mutation removeFollowingMutation(
    $follower_user_id: String!
    $followed_user_id: String!
  ) {
    removeFollowing(
      follower_user_id: $follower_user_id
      followed_user_id: $followed_user_id
    ) {
      id
    }
  }
`;

export const REMOVE_FOLLOWER = gql`
  mutation removeFollowerMutation(
    $follower_user_id: String!
    $followed_user_id: String!
  ) {
    removeFollower(
      follower_user_id: $follower_user_id
      followed_user_id: $followed_user_id
    ) {
      id
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessageMutation(
    $text: String!
    $sender_id: String!
    $receiver_id: String!
  ) {
    addMessage(text: $text, sender_id: $sender_id, receiver_id: $receiver_id) {
      id
      text
      isSeen
      sender_id
      receiver_id
      sent_at
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation deleteMessageMutation($id: ID!) {
    deleteMessage(id: $id) {
      id
    }
  }
`;
export const ADD_REACTION_POST = gql`
  mutation addReactionOnPostMutation($reaction_type: String!, $user_id: ID!, $post_id: ID!) {
    addReactionOnPost(reaction_type: $reaction_type, user_id: $user_id, post_id: $post_id) {
      id
      reaction_type
      post_id
      user_id
    }
  }
`;
export const DELETE_REACTION_POST = gql`
  mutation deleteReactionOnPostMutation($user_id: ID!, $post_id: ID!) {
    deleteReactionOnPost(user_id: $user_id, post_id: $post_id) {
      id
    }
  }
`;
export const ADD_REACTION_COMMENT = gql`
  mutation addReactionOnCommentMutation($reaction_type: String!, $user_id: ID!, $comment_id: ID!) {
    addReactionOnComment(reaction_type: $reaction_type, user_id: $user_id, comment_id: $comment_id) {
      id
      reaction_type
      comment_id
      user_id
    }
  }
`;
export const DELETE_REACTION_COMMENT = gql`
  mutation deleteReactionOnCommentMutation($user_id: ID!, $comment_id: ID!) {
    deleteReactionOnComment(user_id: $user_id, comment_id: $comment_id) {
      id
    }
  }
`;
